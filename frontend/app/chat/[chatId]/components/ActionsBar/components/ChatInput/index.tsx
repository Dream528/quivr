"use client";
import { useFeature } from "@growthbook/growthbook-react";
import { useTranslation } from "react-i18next";
import { MdAddCircle, MdSend } from "react-icons/md";

import Button from "@/lib/components/ui/Button";
import { useBrainContext } from "@/lib/context/BrainProvider/hooks/useBrainContext";

import { ChatBar } from "./components/ChatBar/ChatBar";
import { ConfigModal } from "./components/ConfigModal";
import { FeedBrainInput } from "./components/FeedBrainInput";
import { useChatInput } from "./hooks/useChatInput";

type ChatInputProps = {
  isUploading: boolean;
  setIsUploading: (isUploading: boolean) => void;
};

export const ChatInput = ({
  isUploading,
  setIsUploading,
}: ChatInputProps): JSX.Element => {
  const { setMessage, submitQuestion, chatId, generatingAnswer, message } =
    useChatInput();
  const { t } = useTranslation(["chat"]);
  const shouldDisplayUploadButton = useFeature("ux-upload").on;
  const { currentBrainId } = useBrainContext();

  return (
    <form
      data-testid="chat-input-form"
      onSubmit={(e) => {
        e.preventDefault();
        submitQuestion();
      }}
      className="sticky flex items-star bottom-0 bg-white dark:bg-black w-full flex justify-center gap-2 z-20"
    >
      {!isUploading && shouldDisplayUploadButton && (
        <div className="flex items-start">
          <Button
            className="p-0"
            variant={"tertiary"}
            data-testid="upload-button"
            type="button"
            onClick={() => setIsUploading(true)}
          >
            <MdAddCircle className="text-3xl" />
          </Button>
        </div>
      )}

      <div className="flex flex-1 flex-col items-center">
        {isUploading ? (
          <FeedBrainInput />
        ) : (
          <ChatBar
            message={message}
            setMessage={setMessage}
            onSubmit={submitQuestion}
          />
        )}
      </div>

      <div className="flex flex-row items-end">
        {isUploading ? (
          <div className="flex items-center">
            <Button
              disabled={currentBrainId === null}
              variant="tertiary"
              onClick={() => setIsUploading(false)}
            >
              <MdSend className="text-3xl transform -rotate-90" />
            </Button>
          </div>
        ) : (
          <>
            <Button
              className="px-3 py-2 sm:px-4 sm:py-2"
              type="submit"
              isLoading={generatingAnswer}
              data-testid="submit-button"
            >
              {generatingAnswer
                ? t("thinking", { ns: "chat" })
                : t("chat", { ns: "chat" })}
            </Button>
            <div className="flex items-center">
              <ConfigModal chatId={chatId} />
            </div>
          </>
        )}
      </div>
    </form>
  );
};
