import { useTutorialModalContext } from "@features/sortSensei/hooks";
import { useCallback, useEffect, useState } from "react";
import { tutorialSteps } from "../constants";
import { useTutorialSteps } from "../context/useTutorialSteps";
import { useHighlight } from "./useHighlight";
import { useKeyboardNavigation } from "./useKeyboardNavigation";

/**
 * Custom hook to manage the state and behavior of a tutorial modal.
 * Provides controls for opening, closing, and navigating through steps.
 */
export const useTutorialModal = () => {
  const { refs } = useTutorialModalContext(); // Access refs from context
  const { step } = useTutorialSteps(); // Access step

  const [isOpen, setIsOpen] = useState(true); // State to track if the modal is open
  const { highlight, clearHighlight } = useHighlight(refs); // Highlight controls

  // Function to open the modal
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Function to close the modal and clear highlights
  const closeModal = useCallback(() => {
    clearHighlight();
    setIsOpen(false);
  }, [clearHighlight]);

  // Effect to highlight the element at the current step
  useEffect(() => {
    const { key } = tutorialSteps[step];
    if (key && isOpen) {
      highlight(key);
    } else {
      clearHighlight();
    }
  }, [isOpen, step, highlight, clearHighlight]);

  // Hook to add keyboard navigation event listeners
  useKeyboardNavigation(closeModal, isOpen);

  // Return modal state and controls
  return {
    isOpen,
    openModal,
    closeModal,
  };
};
