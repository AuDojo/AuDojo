import { useTutorialModalContext } from "@/features/sortSensei/context";
import { useEffect } from "react";
import { tutorialSteps } from "../constants";
import { useTutorialSteps } from "../context";
import { useHighlight } from "./useHighlight";

export const useTutorialEvents = () => {
  const { highlightRefs, isTutorialOpen } = useTutorialModalContext(); // Access refs from context
  const { step, setStep } = useTutorialSteps(); // Access step

  const { highlight, clearHighlight } = useHighlight(highlightRefs); // Highlight controls

  useEffect(() => {
    // If tutorial is closed, reset step
    if (!isTutorialOpen) {
      setStep(0);
    }

    // Highlight the current step
    const { key } = tutorialSteps[step];
    if (key && isTutorialOpen) {
      highlight(key);
    } else {
      clearHighlight();
    }
  }, [isTutorialOpen, step, highlight, clearHighlight, setStep]);
};
