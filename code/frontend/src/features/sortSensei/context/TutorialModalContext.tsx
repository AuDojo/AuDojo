import React, { createContext } from "react";
import { RefKeys } from "../tutorialModal/types";

// Define types for our context state
export interface ModalContextProps {
  highlightRefs: Record<RefKeys, React.RefObject<HTMLDivElement | null>>;
}

// Create context with default values
export const TutorialModalContext = createContext<ModalContextProps | undefined>(undefined);
