import { HOTKEYS } from "@/config/hotkeyMap";
import { useTutorialModalContext } from "@/features/sortSensei/context";
import { useHotkeys } from "react-hotkeys-hook";
import { useTutorialSteps } from "../context";

/**
 * Custom hook that adds keyboard event listeners for navigation in the tutorial modal.
 *
 * Listens for specific keyboard events:
 * - "ArrowLeft" or "Shift + Enter" to trigger `handlePrevious`.
 * - "ArrowRight" or "Enter" to trigger `handleNext`.
 * - "Escape" to trigger `closeModal`.
 */
export const useHotkeysTutorial = () => {
  const { handlePrevious, handleNext } = useTutorialSteps();
  const { closeModal, isTutorialOpen } = useTutorialModalContext();

  useHotkeys(HOTKEYS.tutorial.next, handleNext, { enabled: isTutorialOpen, preventDefault: true });
  useHotkeys(HOTKEYS.tutorial.prev, handlePrevious, { enabled: isTutorialOpen, preventDefault: true });
  useHotkeys(HOTKEYS.tutorial.close, closeModal, { enabled: isTutorialOpen, preventDefault: true });
};
