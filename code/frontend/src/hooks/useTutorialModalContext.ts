// Custom Hook
import { TutorialModalContext } from "@src/contexts/TutorialModalContext";
import { useContext } from "react";

export const useTutorialModal = () => {
  const context = useContext(TutorialModalContext);
  if (!context) {
    throw new Error("useTutorialModal must be used within a TutorialModalProvider");
  }
  return context;
};
