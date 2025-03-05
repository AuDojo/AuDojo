import React, { createContext, use, useCallback, useMemo, useRef, useState } from "react";

interface ButtonContextProps {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  timeoutRef: React.RefObject<NodeJS.Timeout | null>;
  clearPlayBackTimer: () => void;
}
const ButtonContext = createContext<ButtonContextProps | null>(null);

export const ButtonContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearPlayBackTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const value = useMemo(
    () => ({
      isPlaying,
      setIsPlaying,
      timeoutRef,
      clearPlayBackTimer,
    }),
    [clearPlayBackTimer, isPlaying]
  );

  return <ButtonContext value={value}>{children}</ButtonContext>;
};

export const useButtonContext = (): ButtonContextProps => {
  const context = use(ButtonContext);
  if (!context) {
    throw new Error("useButtonContext must be used within a ButtonContextProvider");
  }
  return context;
};
