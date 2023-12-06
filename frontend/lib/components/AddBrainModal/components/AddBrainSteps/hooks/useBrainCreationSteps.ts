import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CreateBrainProps } from "@/lib/components/AddBrainModal/types";

import { Step } from "../types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBrainCreationSteps = () => {
  const { t } = useTranslation("brain");

  const steps: Step[] = [
    {
      label: t("brain_type"),
      value: "BRAIN_TYPE",
    },
    {
      label: t("brain_params"),
      value: "BRAIN_PARAMS",
    },
    {
      label: t("resources"),
      value: "KNOWLEDGE",
    },
  ];
  const { watch, setValue } = useFormContext<CreateBrainProps>();
  const currentStep = watch("brainCreationStep");
  const currentStepIndex = steps.findIndex(
    (step) => step.value === currentStep
  );

  const goToNextStep = () => {
    if (currentStepIndex === -1 || currentStepIndex === steps.length - 1) {
      return;
    }
    const nextStep = steps[currentStepIndex + 1];

    return setValue("brainCreationStep", nextStep.value);
  };

  const goToPreviousStep = () => {
    if (currentStepIndex === -1 || currentStepIndex === 0) {
      return;
    }
    const previousStep = steps[currentStepIndex - 1];

    return setValue("brainCreationStep", previousStep.value);
  };

  return {
    currentStep,
    steps,
    goToNextStep,
    goToPreviousStep,
    currentStepIndex,
  };
};
