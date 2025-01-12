import { createContext } from "react";

// Define types for our context state
interface StepsContextProps {
  step: number;
  handlePrevious: () => void;
  handleNext: () => void;
}

export const TutorialStepsContext = createContext<StepsContextProps | undefined>(undefined);
