import React, { createContext, useContext, useRef, useState } from "react";

interface ButtonContextProps {
  timeoutRef: React.RefObject<NodeJS.Timeout | null>;
  solveAllStatus: "solve" | "stop" | "continue";
  setSolveAllStatus: React.Dispatch<React.SetStateAction<"solve" | "stop" | "continue">>;
}
const ButtonContext = createContext<ButtonContextProps | null>(null);

export const ButtonContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [solveAllStatus, setSolveAllStatus] = useState<"solve" | "stop" | "continue">("solve");
  return (
    <ButtonContext.Provider
      value={{
        timeoutRef: useRef<NodeJS.Timeout | null>(null),
        solveAllStatus,
        setSolveAllStatus,
      }}
    >
      {children}
    </ButtonContext.Provider>
  );
};

export const useButtonContext = (): ButtonContextProps => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error("useButtonContext must be used within a ButtonContextProvider");
  }
  return context;
};
