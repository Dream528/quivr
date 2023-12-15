import json
from typing import Optional
from uuid import UUID

from fastapi import HTTPException
from litellm import completion
from llm.knowledge_brain_qa import KnowledgeBrainQA
from llm.qa_interface import QAInterface
from llm.utils.call_brain_api import call_brain_api
from llm.utils.get_api_brain_definition_as_json_schema import (
    get_api_brain_definition_as_json_schema,
)
from logger import get_logger
from modules.brain.service.brain_service import BrainService
from modules.chat.dto.chats import ChatQuestion
from modules.chat.dto.inputs import CreateChatHistory
from modules.chat.dto.outputs import GetChatHistoryOutput
from modules.chat.service.chat_service import ChatService

brain_service = BrainService()
chat_service = ChatService()

logger = get_logger(__name__)


class APIBrainQA(KnowledgeBrainQA, QAInterface):
    user_id: UUID

    def __init__(
        self,
        model: str,
        brain_id: str,
        chat_id: str,
        streaming: bool = False,
        prompt_id: Optional[UUID] = None,
        **kwargs,
    ):
        user_id = kwargs.get("user_id")
        if not user_id:
            raise HTTPException(status_code=400, detail="Cannot find user id")

        super().__init__(
            model=model,
            brain_id=brain_id,
            chat_id=chat_id,
            streaming=streaming,
            prompt_id=prompt_id,
            **kwargs,
        )
        self.user_id = user_id

    async def make_completion(
        self,
        messages,
        functions,
        brain_id: UUID,
        recursive_count=0,
        should_log_steps=False,
    ):
        if recursive_count > 5:
            yield "The assistant is having issues and took more than 5 calls to the API. Please try again later or an other instruction."
            return

        if should_log_steps:
            yield "🧠<Deciding what to do>🧠"

        response = completion(
            model=self.model,
            temperature=self.temperature,
            max_tokens=self.max_tokens,
            messages=messages,
            functions=functions,
            stream=True,
            function_call="auto",
        )

        function_call = {
            "name": None,
            "arguments": "",
        }
        for chunk in response:
            finish_reason = chunk.choices[0].finish_reason
            if finish_reason == "stop":
                break
            if (
                "function_call" in chunk.choices[0].delta
                and chunk.choices[0].delta["function_call"]
            ):
                if chunk.choices[0].delta["function_call"].name:
                    function_call["name"] = chunk.choices[0].delta["function_call"].name
                if chunk.choices[0].delta["function_call"].arguments:
                    function_call["arguments"] += (
                        chunk.choices[0].delta["function_call"].arguments
                    )

            elif finish_reason == "function_call":
                try:
                    arguments = json.loads(function_call["arguments"])

                except Exception:
                    arguments = {}

                if should_log_steps:
                    yield f"🧠<Calling {brain_id} with arguments {arguments}>🧠"

                try:
                    api_call_response = call_brain_api(
                        brain_id=brain_id,
                        user_id=self.user_id,
                        arguments=arguments,
                    )
                except Exception as e:
                    raise HTTPException(
                        status_code=400,
                        detail=f"Error while calling API: {e}",
                    )

                function_name = function_call["name"]
                messages.append(
                    {
                        "role": "function",
                        "name": function_call["name"],
                        "content": f"The function {function_name} was called and gave The following answer:(data from function) {api_call_response} (end of data from function). Don't call this function again unless there was an error or extremely necessary and asked specifically by the user.",
                    }
                )
                async for value in self.make_completion(
                    messages=messages,
                    functions=functions,
                    brain_id=brain_id,
                    recursive_count=recursive_count + 1,
                    should_log_steps=should_log_steps,
                ):
                    yield value

            else:
                if (
                    hasattr(chunk.choices[0], "delta")
                    and chunk.choices[0].delta
                    and hasattr(chunk.choices[0].delta, "content")
                ):
                    content = chunk.choices[0].delta.content
                    yield content
                else:  # pragma: no cover
                    yield "**...**"
                    break

    async def generate_stream(
        self,
        chat_id: UUID,
        question: ChatQuestion,
        save_answer: bool = True,
        should_log_steps: Optional[bool] = True,
    ):
        if not question.brain_id:
            raise HTTPException(
                status_code=400, detail="No brain id provided in the question"
            )

        brain = brain_service.get_brain_by_id(question.brain_id)

        if not brain:
            raise HTTPException(status_code=404, detail="Brain not found")

        prompt_content = "You are a helpful assistant that can access functions to help answer questions. If there are information missing in the question, you can ask follow up questions to get more information to the user. Once all the information is available, you can call the function to get the answer."

        if self.prompt_to_use:
            prompt_content += self.prompt_to_use.content

        messages = [{"role": "system", "content": prompt_content}]

        history = chat_service.get_chat_history(self.chat_id)

        for message in history:
            formatted_message = [
                {"role": "user", "content": message.user_message},
                {"role": "assistant", "content": message.assistant},
            ]
            messages.extend(formatted_message)

        messages.append({"role": "user", "content": question.question})

        if save_answer:
            streamed_chat_history = chat_service.update_chat_history(
                CreateChatHistory(
                    **{
                        "chat_id": chat_id,
                        "user_message": question.question,
                        "assistant": "",
                        "brain_id": question.brain_id,
                        "prompt_id": self.prompt_to_use_id,
                    }
                )
            )
            streamed_chat_history = GetChatHistoryOutput(
                **{
                    "chat_id": str(chat_id),
                    "message_id": streamed_chat_history.message_id,
                    "message_time": streamed_chat_history.message_time,
                    "user_message": question.question,
                    "assistant": "",
                    "prompt_title": self.prompt_to_use.title
                    if self.prompt_to_use
                    else None,
                    "brain_name": brain.name if brain else None,
                }
            )
        else:
            streamed_chat_history = GetChatHistoryOutput(
                **{
                    "chat_id": str(chat_id),
                    "message_id": None,
                    "message_time": None,
                    "user_message": question.question,
                    "assistant": "",
                    "prompt_title": self.prompt_to_use.title
                    if self.prompt_to_use
                    else None,
                    "brain_name": brain.name if brain else None,
                }
            )
        response_tokens = []
        async for value in self.make_completion(
            messages=messages,
            functions=[get_api_brain_definition_as_json_schema(brain)],
            brain_id=question.brain_id,
            should_log_steps=should_log_steps,
        ):
            streamed_chat_history.assistant = value
            response_tokens.append(value)
            yield f"data: {json.dumps(streamed_chat_history.dict())}"
        response_tokens = [
            token
            for token in response_tokens
            if not token.startswith("🧠<") and not token.endswith(">🧠")
        ]
        if save_answer:
            chat_service.update_message_by_id(
                message_id=str(streamed_chat_history.message_id),
                user_message=question.question,
                assistant="".join(response_tokens),
            )

    def make_completion_without_streaming(
        self,
        messages,
        functions,
        brain_id: UUID,
        recursive_count=0,
        should_log_steps=False,
    ):
        if recursive_count > 5:
            print(
                "The assistant is having issues and took more than 5 calls to the API. Please try again later or an other instruction."
            )
            return

        if should_log_steps:
            print("🧠<Deciding what to do>🧠")

        response = completion(
            model=self.model,
            temperature=self.temperature,
            max_tokens=self.max_tokens,
            messages=messages,
            functions=functions,
            stream=False,
            function_call="auto",
        )

        response_message = response.choices[0].message
        finish_reason = response.choices[0].finish_reason

        if finish_reason == "function_call":
            function_call = response_message.function_call
            try:
                arguments = json.loads(function_call.arguments)

            except Exception:
                arguments = {}

            if should_log_steps:
                print(f"🧠<Calling {brain_id} with arguments {arguments}>🧠")

            try:
                api_call_response = call_brain_api(
                    brain_id=brain_id,
                    user_id=self.user_id,
                    arguments=arguments,
                )
            except Exception as e:
                raise HTTPException(
                    status_code=400,
                    detail=f"Error while calling API: {e}",
                )

            function_name = function_call.name
            messages.append(
                {
                    "role": "function",
                    "name": function_call.name,
                    "content": f"The function {function_name} was called and gave The following answer:(data from function) {api_call_response} (end of data from function). Don't call this function again unless there was an error or extremely necessary and asked specifically by the user.",
                }
            )

            return self.make_completion_without_streaming(
                messages=messages,
                functions=functions,
                brain_id=brain_id,
                recursive_count=recursive_count + 1,
                should_log_steps=should_log_steps,
            )

        if finish_reason == "stop":
            return response_message

        else:
            print("Never ending completion")

    def generate_answer(
        self,
        chat_id: UUID,
        question: ChatQuestion,
        save_answer: bool = True,
    ):
        if not question.brain_id:
            raise HTTPException(
                status_code=400, detail="No brain id provided in the question"
            )

        brain = brain_service.get_brain_by_id(question.brain_id)

        if not brain:
            raise HTTPException(status_code=404, detail="Brain not found")

        prompt_content = "You are a helpful assistant that can access functions to help answer questions. If there are information missing in the question, you can ask follow up questions to get more information to the user. Once all the information is available, you can call the function to get the answer."

        if self.prompt_to_use:
            prompt_content += self.prompt_to_use.content

        messages = [{"role": "system", "content": prompt_content}]

        history = chat_service.get_chat_history(self.chat_id)

        for message in history:
            formatted_message = [
                {"role": "user", "content": message.user_message},
                {"role": "assistant", "content": message.assistant},
            ]
            messages.extend(formatted_message)

        messages.append({"role": "user", "content": question.question})

        response = self.make_completion_without_streaming(
            messages=messages,
            functions=[get_api_brain_definition_as_json_schema(brain)],
            brain_id=question.brain_id,
            should_log_steps=False,
        )

        answer = response.content
        if save_answer:
            new_chat = chat_service.update_chat_history(
                CreateChatHistory(
                    **{
                        "chat_id": chat_id,
                        "user_message": question.question,
                        "assistant": answer,
                        "brain_id": question.brain_id,
                        "prompt_id": self.prompt_to_use_id,
                    }
                )
            )

            return GetChatHistoryOutput(
                **{
                    "chat_id": chat_id,
                    "user_message": question.question,
                    "assistant": answer,
                    "message_time": new_chat.message_time,
                    "prompt_title": self.prompt_to_use.title
                    if self.prompt_to_use
                    else None,
                    "brain_name": brain.name if brain else None,
                    "message_id": new_chat.message_id,
                }
            )
        return GetChatHistoryOutput(
            **{
                "chat_id": chat_id,
                "user_message": question.question,
                "assistant": answer,
                "message_time": "123",
                "prompt_title": None,
                "brain_name": brain.name,
                "message_id": None,
            }
        )
