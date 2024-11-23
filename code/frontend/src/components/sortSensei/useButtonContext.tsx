import { useContext } from "react";
import { ButtonContext, ButtonContextProps } from "./ButtonContext";

export const useButtonContext = (): ButtonContextProps => {
    const context = useContext(ButtonContext);
    if (!context) {
        throw new Error("useButtonContext must be used within a ButtonContextProvider");
    }
    return context;
}