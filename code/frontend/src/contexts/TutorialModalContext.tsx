import React, { createContext } from "react";

// Define types for the highlighted elements
export type RefKeys = "sortingTable" | "generateButtons" | "d3Visualizer" | "solveButtons";

// Define types for our context state
export interface ModalContextProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  refs: Record<RefKeys, React.RefObject<HTMLElement | null>>;
  highlight: (key: RefKeys) => void;
  clearHighlight: () => void;
}

// Create context with default values
export const TutorialModalContext = createContext<ModalContextProps | undefined>(undefined);
