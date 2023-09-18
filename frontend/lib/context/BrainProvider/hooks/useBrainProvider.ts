/* eslint-disable max-lines */
import { UUID } from "crypto";
import { useCallback, useState } from "react";

import { CreateBrainInput } from "@/lib/api/brain/types";
import { useBrainApi } from "@/lib/api/brain/useBrainApi";
import { usePromptApi } from "@/lib/api/prompt/usePromptApi";
import { useToast } from "@/lib/hooks";
import { Prompt } from "@/lib/types/Prompt";
import { useEventTracking } from "@/services/analytics/june/useEventTracking";

import { MinimalBrainForUser } from "../types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBrainProvider = () => {
  const { publish } = useToast();
  const { track } = useEventTracking();
  const { createBrain, deleteBrain, getBrains, getDefaultBrain } =
    useBrainApi();
  const { getPublicPrompts } = usePromptApi();

  const [allBrains, setAllBrains] = useState<MinimalBrainForUser[]>([]);
  const [currentBrainId, setCurrentBrainId] = useState<null | UUID>(null);
  const [defaultBrainId, setDefaultBrainId] = useState<UUID>();
  const [isFetchingBrains, setIsFetchingBrains] = useState(false);
  const [publicPrompts, setPublicPrompts] = useState<Prompt[]>([]);
  const [currentPromptId, setCurrentPromptId] = useState<null | string>(null);

  const currentPrompt = publicPrompts.find(
    (prompt) => prompt.id === currentPromptId
  );
  const currentBrain = allBrains.find((brain) => brain.id === currentBrainId);

  const createBrainHandler = useCallback(
    async (brain: CreateBrainInput): Promise<UUID | undefined> => {
      const createdBrain = await createBrain(brain);
      try {
        setAllBrains((prevBrains) => [...prevBrains, createdBrain]);
        setCurrentBrainId(createdBrain.id);

        void track("BRAIN_CREATED");

        return createdBrain.id;
      } catch {
        publish({
          variant: "danger",
          text: "Error occurred while creating a brain",
        });
      }
    },
    [createBrain, publish, track]
  );

  const deleteBrainHandler = useCallback(
    async (id: UUID) => {
      await deleteBrain(id);
      setAllBrains((prevBrains) =>
        prevBrains.filter((brain) => brain.id !== id)
      );
      void track("DELETE_BRAIN");
      publish({
        variant: "success",
        text: "Brain deleted",
      });
    },
    [deleteBrain, publish, track]
  );

  const fetchAllBrains = useCallback(async () => {
    setIsFetchingBrains(true);
    try {
      const brains = await getBrains();
      setAllBrains(brains);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingBrains(false);
    }
  }, [getBrains]);

  const fetchDefaultBrain = useCallback(async () => {
    const userDefaultBrain = await getDefaultBrain();
    if (userDefaultBrain !== undefined) {
      setDefaultBrainId(userDefaultBrain.id);
    }
    if (currentBrainId === null && userDefaultBrain !== undefined) {
      setCurrentBrainId(userDefaultBrain.id);
    }
  }, [currentBrainId, getDefaultBrain]);

  const fetchPublicPrompts = useCallback(async () => {
    setPublicPrompts(await getPublicPrompts());
  }, [getPublicPrompts]);

  return {
    allBrains,
    fetchAllBrains,
    isFetchingBrains,

    currentBrain,
    currentBrainId,
    setCurrentBrainId,

    defaultBrainId,
    fetchDefaultBrain,

    fetchPublicPrompts,
    publicPrompts,
    currentPrompt,

    setCurrentPromptId,
    currentPromptId,

    createBrain: createBrainHandler,

    deleteBrain: deleteBrainHandler,
  };
};
