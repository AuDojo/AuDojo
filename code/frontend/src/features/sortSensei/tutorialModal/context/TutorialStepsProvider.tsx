import { tutorialSteps } from "@/features/sortSensei/tutorialModal/constants";
import { ReactNode, useCallback, useState } from "react";
import { TutorialStepsContext } from "./TutorialStepsContext";

export const TutorialStepsProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(0);

  const handlePrevious = useCallback(() => setStep((prev) => Math.max(0, prev - 1)), []);
  const handleNext = useCallback(() => setStep((prev) => Math.min(tutorialSteps.length - 1, prev + 1)), []);

  return (
    <TutorialStepsContext.Provider value={{ step, handleNext, handlePrevious }}>
      {children}
    </TutorialStepsContext.Provider>
  );
};
