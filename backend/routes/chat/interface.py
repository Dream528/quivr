from abc import ABC, abstractmethod


class ChatInterface(ABC):
    @abstractmethod
    def validate_authorization(self, user_id, required_roles):
        pass

    @abstractmethod
    def get_openai_api_key(self, brain_id, user_id):
        pass

    @abstractmethod
    def get_answer_generator(
        self,
        brain_id,
        chat_id,
        model,
        max_tokens,
        temperature,
        user_openai_api_key,
        streaming,
        prompt_id,
    ):
        pass
