import React, { createContext, ReactNode, use, useRef } from "react";
import { RefKeys } from "../tutorialModal/types";

// Define types for our context state
interface ModalContextProps {
  highlightRefs: Record<RefKeys, React.RefObject<HTMLDivElement | null>>;
}

// Create context with default values
const TutorialModalContext = createContext<ModalContextProps | undefined>(undefined);

export const TutorialModalProvider = ({ children }: { children: ReactNode }) => {
  // Refs for focusable elements
  const highlightRefs: Record<RefKeys, React.RefObject<HTMLDivElement | null>> = {
    sortingTable: useRef<HTMLDivElement>(null),
    generateButtons: useRef<HTMLDivElement>(null),
    d3Visualizer: useRef<HTMLDivElement>(null),
    solveButtons: useRef<HTMLDivElement>(null),
    listRow: useRef<HTMLDivElement>(null),
  };

  return <TutorialModalContext value={{ highlightRefs }}>{children}</TutorialModalContext>;
};

// Custom Hook

export const useTutorialModalContext = () => {
  const context = use(TutorialModalContext);
  if (!context) {
    throw new Error("useTutorialModal must be used within a TutorialModalProvider");
  }
  return context;
};
