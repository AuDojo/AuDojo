import { ButtonContext, ButtonContextProps } from "@contexts/ButtonContext";
import { useContext } from "react";

export const useButtonContext = (): ButtonContextProps => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error(
      "useButtonContext must be used within a ButtonContextProvider"
    );
  }
  return context;
};
