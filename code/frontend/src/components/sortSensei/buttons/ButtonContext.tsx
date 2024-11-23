import React, { createContext, useState } from "react";

export interface ButtonContextProps {
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
  solveAllStatus: "solve" | "stop" | "continue";
  setSolveAllStatus: React.Dispatch<React.SetStateAction<"solve" | "stop" | "continue">>;
}
export const ButtonContext = createContext<ButtonContextProps | null>(null);

export const ButtonContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [solveAllStatus, setSolveAllStatus] = useState<"solve" | "stop" | "continue">("solve");
  return (
    <ButtonContext.Provider value={{ timeoutRef: React.useRef<NodeJS.Timeout | null>(null) , solveAllStatus, setSolveAllStatus}}>
      {children}
    </ButtonContext.Provider>
  );
};
