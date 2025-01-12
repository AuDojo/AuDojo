import React, { createContext, ReactNode, useRef } from "react";
import { RefKeys } from "../tutorialModal/types";

// Define types for our context state
export interface ModalContextProps {
  highlightRefs: Record<RefKeys, React.RefObject<HTMLDivElement | null>>;
}

// Create context with default values
export const TutorialModalContext = createContext<ModalContextProps | undefined>(undefined);

export const TutorialModalProvider = ({ children }: { children: ReactNode }) => {
  // Refs for focusable elements
  const highlightRefs: Record<RefKeys, React.RefObject<HTMLDivElement | null>> = {
    sortingTable: useRef<HTMLDivElement>(null),
    generateButtons: useRef<HTMLDivElement>(null),
    d3Visualizer: useRef<HTMLDivElement>(null),
    solveButtons: useRef<HTMLDivElement>(null),
  };

  return <TutorialModalContext.Provider value={{ highlightRefs }}>{children}</TutorialModalContext.Provider>;
};
