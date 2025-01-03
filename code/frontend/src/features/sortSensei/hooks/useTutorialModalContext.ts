// Custom Hook
import { TutorialModalContext } from "@src/features/sortSensei/tutorialModal/context/TutorialModalContext";
import { useContext } from "react";

export const useTutorialModalContext = () => {
  const context = useContext(TutorialModalContext);
  if (!context) {
    throw new Error("useTutorialModal must be used within a TutorialModalProvider");
  }
  return context;
};
