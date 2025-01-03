import { useRef, useState } from "react";
import { ButtonContext } from "./ButtonContext";

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
