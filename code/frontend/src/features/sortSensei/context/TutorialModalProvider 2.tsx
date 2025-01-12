import React, { ReactNode, useRef } from "react";
import { RefKeys } from "../tutorialModal/types";
import { TutorialModalContext } from "./TutorialModalContext";

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
