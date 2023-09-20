import { useQuery } from "@tanstack/react-query";
import { UUID } from "crypto";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getBrainDataKey } from "@/lib/api/brain/config";
import { useBrainApi } from "@/lib/api/brain/useBrainApi";
import { useBrainContext } from "@/lib/context/BrainProvider/hooks/useBrainContext";

import { BrainManagementTab } from "../types";
import { getTargetedTab } from "../utils/getTargetedTab";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBrainManagementTabs = () => {
  const [selectedTab, setSelectedTab] =
    useState<BrainManagementTab>("settings");

  useEffect(() => {
    const targetedTab = getTargetedTab();
    if (targetedTab !== undefined) {
      setSelectedTab(targetedTab);
    }
  }, []);
  const { getBrain } = useBrainApi();

  const { deleteBrain, setCurrentBrainId } = useBrainContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  const params = useParams();

  const brainId = params?.brainId as UUID | undefined;

  const { data: brain } = useQuery({
    queryKey: [getBrainDataKey(brainId!)],
    queryFn: () => getBrain(brainId!),
    enabled: brainId !== undefined,
  });

  const handleDeleteBrain = () => {
    if (brainId === undefined) {
      return;
    }
    void deleteBrain(brainId);
    setCurrentBrainId(null);
    router.push("/brains-management");
    setIsDeleteModalOpen(false);
  };

  return {
    selectedTab,
    setSelectedTab,
    brainId,
    handleDeleteBrain,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    brain,
  };
};
