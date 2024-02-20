import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UUID } from "crypto";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { PUBLIC_BRAINS_KEY } from "@/lib/api/brain/config";
import { IntegrationSettings } from "@/lib/api/brain/types";
import { CreateBrainProps } from "@/lib/components/AddBrainModal/types/types";
import { useKnowledgeToFeedInput } from "@/lib/components/KnowledgeToFeedInput/hooks/useKnowledgeToFeedInput.ts";
import { useBrainContext } from "@/lib/context/BrainProvider/hooks/useBrainContext";
import { useKnowledgeToFeedContext } from "@/lib/context/KnowledgeToFeedProvider/hooks/useKnowledgeToFeedContext";
import { useToast } from "@/lib/hooks";
import { useKnowledgeToFeedFilesAndUrls } from "@/lib/hooks/useKnowledgeToFeed";

import { useBrainCreationContext } from "../../../brainCreation-provider";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBrainCreationApi = () => {
  const queryClient = useQueryClient();
  const { publish } = useToast();
  const { t } = useTranslation(["brain", "config"]);
  const { files, urls } = useKnowledgeToFeedFilesAndUrls();
  const { getValues, reset } = useFormContext<CreateBrainProps>();
  const { setKnowledgeToFeed } = useKnowledgeToFeedContext();
  const { createBrain: createBrainApi, setCurrentBrainId } = useBrainContext();
  const { crawlWebsiteHandler, uploadFileHandler } = useKnowledgeToFeedInput();
  const {
    setIsBrainCreationModalOpened,
    setCreating,
    currentIntegrationBrain,
  } = useBrainCreationContext();

  const handleFeedBrain = async (brainId: UUID): Promise<void> => {
    const uploadPromises = files.map((file) =>
      uploadFileHandler(file, brainId)
    );
    const crawlPromises = urls.map((url) => crawlWebsiteHandler(url, brainId));

    await Promise.all([...uploadPromises, ...crawlPromises]);
    setKnowledgeToFeed([]);
  };

  const createBrain = async (): Promise<void> => {
    const { name, description } = getValues();
    let integrationSettings: IntegrationSettings | undefined = undefined;

    if (currentIntegrationBrain) {
      integrationSettings = {
        integration_id: currentIntegrationBrain.id,
        settings: {},
      };
    }

    const createdBrainId = await createBrainApi({
      brain_type: currentIntegrationBrain ? "integration" : "doc",
      name,
      description,
      integration: integrationSettings,
    });

    if (createdBrainId === undefined) {
      publish({
        variant: "danger",
        text: t("errorCreatingBrain", { ns: "brain" }),
      });

      return;
    }

    void handleFeedBrain(createdBrainId);

    setCurrentBrainId(createdBrainId);
    setIsBrainCreationModalOpened(false);
    setCreating(false);
    reset();

    void queryClient.invalidateQueries({
      queryKey: [PUBLIC_BRAINS_KEY],
    });
  };

  const { mutate, isPending: isBrainCreationPending } = useMutation({
    mutationFn: createBrain,
    onSuccess: () => {
      publish({
        variant: "success",
        text: t("brainCreated", { ns: "brain" }),
      });
    },
    onError: () => {
      publish({
        variant: "danger",
        text: t("errorCreatingBrain", { ns: "brain" }),
      });
    },
  });

  return {
    createBrain: mutate,
    isBrainCreationPending,
  };
};
