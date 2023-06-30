from logger import get_logger
from models.chat import ChatHistory
from models.settings import common_dependencies

logger = get_logger(__name__)


def update_message_by_id(
    message_id: str, user_message: str, assistant: str
) -> ChatHistory:
    commons = common_dependencies()

    if not message_id:
        logger.error("No message_id provided")
        return

    updates = {}

    if user_message is not None:
        updates["user_message"] = user_message

    if assistant is not None:
        updates["assistant"] = user_message

    updated_message = None

    if updates:
        updated_message = (
            commons["supabase"]
            .table("chat_history")
            .update(updates)
            .match({"message_id": message_id})
            .execute()
        ).data[0]
        logger.info(f"Message {message_id} updated")
    else:
        logger.info(f"No updates to apply for message {message_id}")
    return ChatHistory(updated_message)
