import { HIGHLIGHT_CLASS } from "@constants/modal";
import React, { useRef, useState } from "react";
import { RefKeys, TutorialModalContext } from "./TutorialModalContext";

export const TutorialModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Refs for focusable elements
  const refs: Record<RefKeys, React.RefObject<HTMLElement | null>> = {
    sortingTable: useRef<HTMLDivElement>(null),
    generateButtons: useRef<HTMLDivElement>(null),
    d3Visualizer: useRef<HTMLDivElement>(null),
    solveButtons: useRef<HTMLDivElement>(null),
  };

  const highlight = (key: RefKeys) => {
    clearHighlight();
    if (refs[key]?.current) {
      refs[key].current.classList.add(HIGHLIGHT_CLASS);
      refs[key].current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const clearHighlight = () => {
    Object.values(refs).forEach((el) => {
      if (el?.current) {
        el.current.classList.remove(HIGHLIGHT_CLASS);
      }
    });
  };

  return (
    <TutorialModalContext.Provider value={{ currentStep, setCurrentStep, dialogRef, refs, highlight, clearHighlight }}>
      {children}
    </TutorialModalContext.Provider>
  );
};
