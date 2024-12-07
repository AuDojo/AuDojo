import { SortContext, SortContextProps } from "@contexts/SortContext";
import { useContext } from "react";

export const useSortContext = (): SortContextProps => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSortContext must be used within a SortProvider");
  }
  return context;
};
