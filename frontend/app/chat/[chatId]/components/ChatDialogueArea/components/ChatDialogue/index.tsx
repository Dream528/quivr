import { useTranslation } from "react-i18next";

import { useOnboarding } from "@/lib/hooks/useOnboarding";

import { ChatItem } from "./components";
import { useChatDialogue } from "./hooks/useChatDialogue";
import {
  chatDialogueContainerClassName,
  chatItemContainerClassName,
} from "./styles";
import { getKeyFromChatItem } from "./utils/getKeyFromChatItem";

import { ChatItemWithGroupedNotifications } from "../../types";

type MessagesDialogueProps = {
  chatItems: ChatItemWithGroupedNotifications[];
};

export const ChatDialogue = ({
  chatItems,
}: MessagesDialogueProps): JSX.Element => {
  const { t } = useTranslation(["chat"]);
  const { chatListRef } = useChatDialogue();

  const { shouldDisplayOnboardingAInstructions } = useOnboarding();

  if (shouldDisplayOnboardingAInstructions) {
    return (
      <div className={chatDialogueContainerClassName} ref={chatListRef}>
        <div className={chatItemContainerClassName}>
          {chatItems.map((chatItem, index) => (
            <ChatItem
              key={getKeyFromChatItem(chatItem)}
              content={chatItem}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={chatDialogueContainerClassName} ref={chatListRef}>
      {chatItems.length === 0 ? (
        <div
          data-testid="empty-history-message"
          className="text-center opacity-50"
        >
          {t("ask", { ns: "chat" })}
        </div>
      ) : (
        <div className={chatItemContainerClassName}>
          {chatItems.map((chatItem, index) => (
            <ChatItem
              key={getKeyFromChatItem(chatItem)}
              content={chatItem}
              index={index}
              lastMessage={index === chatItems.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
