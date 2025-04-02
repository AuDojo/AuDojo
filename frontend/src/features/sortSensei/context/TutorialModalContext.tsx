import { localStorageKeys } from "@/config/localStorage";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React, { createContext, ReactNode, use, useCallback, useMemo, useRef } from "react";
import { useHighlight } from "../components/tutorialModal/hooks/useHighlight";
import { RefKeys } from "../components/tutorialModal/types";

// Define types for our context state
interface ModalContextProps {
  highlightRefs: Record<RefKeys, React.RefObject<HTMLDivElement | null>>;

  isTutorialOpen: boolean;
  setIsTutorialOpen: React.Dispatch<React.SetStateAction<boolean>>;

  closeModal: () => void;
  toggleModal: () => void;
}

// Create context with default values
const TutorialModalContext = createContext<ModalContextProps | undefined>(undefined);

export const TutorialModalProvider = ({ children }: { children: ReactNode }) => {
  // TODO: Temporarily disable react compiler for this one
  // eslint-disable-next-line react-compiler/react-compiler
  "use no memo";

  // State to control the visibility of the modal
  const [isTutorialOpen, setIsTutorialOpen] = useLocalStorage<boolean>(localStorageKeys.tutorial, true);

  // Refs for focusable elements
  const highlightRefs = {
    sortingTable: useRef<HTMLDivElement>(null),
    generateButtons: useRef<HTMLDivElement>(null),
    d3Visualizer: useRef<HTMLDivElement>(null),
    solveButtons: useRef<HTMLDivElement>(null),
    listRow: useRef<HTMLDivElement>(null),
  } satisfies Record<RefKeys, React.RefObject<HTMLDivElement | null>>;

  const { clearHighlight } = useHighlight(highlightRefs); // Highlight controls

  // Function to close the modal
  const closeModal = useCallback(() => {
    clearHighlight();
    setIsTutorialOpen(false);
  }, [clearHighlight, setIsTutorialOpen]);

  // Function to toggle the modal
  const toggleModal = useCallback(() => {
    clearHighlight();
    setIsTutorialOpen((prev) => !prev);
  }, [clearHighlight, setIsTutorialOpen]);

  const value = useMemo(
    () => ({ highlightRefs, isTutorialOpen, setIsTutorialOpen, closeModal, toggleModal }),
    [closeModal, highlightRefs, isTutorialOpen, setIsTutorialOpen, toggleModal]
  );

  return <TutorialModalContext value={value}>{children}</TutorialModalContext>;
};

// Custom Hook
export const useTutorialModalContext = () => {
  const context = use(TutorialModalContext);
  if (!context) {
    throw new Error("useTutorialModal must be used within a TutorialModalProvider");
  }
  return context;
};
