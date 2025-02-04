import { useSortContext } from "@/features/sortSensei/context/SortContext";
import { useMemo } from "react";

export const useInitTableStates = () => {
  const { processList } = useSortContext();

  return useMemo(() => {
    if (!processList || processList.length === 0) {
      return {
        inputCellValues: [],
        cellValidation: [],
        inputCells: [],
      };
    }

    const inputCellValues = processList.map((step, index) =>
      index === 0 ? step.map(String) : new Array<string>(step.length).fill("")
    );

    const cellValidation = processList.map((step) => new Array<null>(step.length).fill(null));

    const inputCells = processList.map((step) => new Array<null>(step.length).fill(null));

    return { inputCellValues, cellValidation, inputCells };
  }, [processList]); // Memoize based on processList
};
