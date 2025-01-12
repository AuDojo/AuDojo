import { useEffect } from "react";
import { useTutorialSteps } from "../context/useTutorialSteps";

/**
 * Custom hook that adds keyboard event listeners for navigation in the tutorial modal.
 *
 * Listens for specific keyboard events:
 * - "ArrowLeft" or "Shift + Enter" to trigger `handlePrevious`.
 * - "ArrowRight" or "Enter" to trigger `handleNext`.
 * - "Escape" to trigger `closeModal`.
 *
 * @param {() => void} handlePrevious - Callback function to handle the previous action.
 * @param {() => void} handleNext - Callback function to handle the next action.
 * @param {() => void} closeModal - Callback function to handle closing the modal.
 * @param {boolean} isOpen - Whether the tutorial modal is open or not.
 */
export const useKeyboardNavigation = (closeModal: () => void, isOpen: boolean) => {
  const { handlePrevious, handleNext } = useTutorialSteps();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, shiftKey } = event;
      if (key === "ArrowLeft" || (key === "Enter" && shiftKey)) {
        handlePrevious();
      } else if (key === "ArrowRight" || key === "Enter") {
        handleNext();
      }
      if (key === "Escape") {
        closeModal();
      }
    };

    // Only add the event listener if the modal is open.
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Clean up function to remove the event listener.
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext, closeModal, isOpen]);
};
