import { tutorialSteps } from "@/features/sortSensei/components/tutorialModal/constants";
import { createContext, ReactNode, use, useCallback, useMemo, useState } from "react";

// Define types for our context state
interface StepsContextProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handlePrevious: () => void;
  handleNext: () => void;
}

export const TutorialStepsContext = createContext<StepsContextProps | undefined>(undefined);

export const TutorialStepsProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(0);

  const handlePrevious = useCallback(() => setStep((prev) => Math.max(0, prev - 1)), []);
  const handleNext = useCallback(() => setStep((prev) => Math.min(tutorialSteps.length - 1, prev + 1)), []);

  const value = useMemo(() => ({ step, setStep, handleNext, handlePrevious }), [handleNext, handlePrevious, step]);

  return <TutorialStepsContext value={value}>{children}</TutorialStepsContext>;
};

export const useTutorialStepsContext = () => {
  const context = use(TutorialStepsContext);
  if (!context) {
    throw new Error("useTutorialSteps must be used within a TutorialStepsProvider");
  }
  return context;
};
