import { useTranslation } from "react-i18next";

import { useChatContext } from "@/lib/context";

export const ChatHeader = (): JSX.Element => {
  const { t } = useTranslation(["chat"]);
  const { history } = useChatContext();

  if (history.length !== 0) {
    return (
      <h1 className="text-3xl font-bold text-center">
        {t("chat_title_intro")}{" "}
        <span className="text-purple-500">{t("brains")}</span>
      </h1>
    );
  }

  return (
    <h1 className="text-3xl font-bold text-center">
      {t("chat_title_intro")}{" "}
      <span className="text-purple-500">{t("brains")}</span>
      {" !! "}
      <br />
      {t("empty_brain_title_prefix")}{" "}
      <span className="text-purple-500">{t("brain")}</span>{" "}
      {t("empty_brain_title_suffix")}
    </h1>
  );
};
