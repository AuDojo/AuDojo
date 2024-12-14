import React, { createContext } from "react";

export interface ButtonContextProps {
  timeoutRef: React.RefObject<NodeJS.Timeout | null>;
  solveAllStatus: "solve" | "stop" | "continue";
  setSolveAllStatus: React.Dispatch<React.SetStateAction<"solve" | "stop" | "continue">>;
}
export const ButtonContext = createContext<ButtonContextProps | null>(null);
