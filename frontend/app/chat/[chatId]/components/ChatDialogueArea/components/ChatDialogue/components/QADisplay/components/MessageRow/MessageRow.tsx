import React from "react";

import Icon from "@/lib/components/ui/Icon/Icon";

import styles from "./MessageRow.module.scss";
import { CopyButton } from "./components/CopyButton";
import { MessageContent } from "./components/MessageContent/MessageContent";
import { QuestionBrain } from "./components/QuestionBrain/QuestionBrain";
import { QuestionPrompt } from "./components/QuestionPrompt/QuestionPrompt";
import { useMessageRow } from "./hooks/useMessageRow";

type MessageRowProps = {
  speaker: "user" | "assistant";
  text?: string;
  brainName?: string | null;
  promptName?: string | null;
  children?: React.ReactNode;
  metadata?: {
    sources?: [string] | [];
  };
};

export const MessageRow = React.forwardRef(
  (
    { speaker, text, brainName, promptName, children }: MessageRowProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { handleCopy, isCopied, isUserSpeaker } = useMessageRow({
      speaker,
      text,
    });

    const messageContent = text ?? "";

    return (
      <div
        className={`
      ${styles.message_row_container ?? ""} 
      ${isUserSpeaker ? styles.user ?? "" : styles.brain ?? ""}
      `}
      >
        {!isUserSpeaker ? (
          <div className={styles.message_header}>
            <div className={styles.left_wrapper}>
              <QuestionBrain brainName={brainName} />
              <QuestionPrompt promptName={promptName} />
            </div>
            <div className={styles.copy_button}>
              <CopyButton handleCopy={handleCopy} isCopied={isCopied} />
            </div>
          </div>
        ) : (
          <div className={styles.message_header}>
            <Icon name="user" color="dark-grey" size="normal" />
            <span className={styles.me}>Me</span>
          </div>
        )}
        {}
        <div ref={ref} className={styles.message_row_content}>
          {children ?? (
            <MessageContent text={messageContent} isUser={isUserSpeaker} />
          )}
        </div>
      </div>
    );
  }
);

MessageRow.displayName = "MessageRow";
