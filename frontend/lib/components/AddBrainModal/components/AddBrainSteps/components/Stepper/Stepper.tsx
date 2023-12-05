import { Fragment } from "react";

import { cn } from "@/lib/utils";

import { useBrainCreationSteps } from "../../hooks/useBrainCreationSteps";

export const Stepper = (): JSX.Element => {
  const { currentStep, steps } = useBrainCreationSteps();

  return (
    <div className="flex flex-row justify-between w-full px-12 mb-12">
      {steps.map((step, index) => (
        <Fragment key={step.value}>
          <div
            key={step.label}
            className="flex flex-row justify-center items-center flex-1"
          >
            <div className="flex flex-col justify-center items-center">
              <div
                className={cn(
                  "h-[40px] w-[40px] border-solid rounded-full flex flex-row items-center justify-center mb-2 border-primary border-2",
                  step.value === currentStep ? "bg-primary text-white" : ""
                )}
              >
                {index + 1}
              </div>
              <span key={step.label} className="text-xs text-center">
                {step.label}
              </span>
            </div>
          </div>
          {index < steps.length - 1 && ( // Add horizontal line for all but the last step
            <hr
              className={cn(
                "flex-grow border-t-2 border-primary m-4",
                step.value === currentStep
                  ? "border-primary"
                  : "border-gray-300"
              )}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};
