import { useContext } from "react";
import { TutorialStepsContext } from "./TutorialStepsContext";

export const useTutorialSteps = () => {
  const context = useContext(TutorialStepsContext);
  if (!context) {
    throw new Error("useTutorialSteps must be used within a TutorialStepsProvider");
  }
  return context;
};
