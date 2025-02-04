import { useSortContext } from "@/features/sortSensei/context";
import React, { createContext, use, useRef, useState } from "react";
import { initTableStates } from "../utils/initTableStates";

interface TableContextProps {
  inputCellValues: string[][];
  setInputCellValues: React.Dispatch<React.SetStateAction<string[][]>>;

  cellValidation: (boolean | null)[][];
  setCellValidation: React.Dispatch<React.SetStateAction<(boolean | null)[][]>>;

  inputCellsRef: React.RefObject<(HTMLInputElement | null)[][]>;
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const { sharedArray } = useSortContext();
  const { initInputCellValues, initCellValidation, initInputCells } = initTableStates(sharedArray);

  const [inputCellValues, setInputCellValues] = useState<string[][]>(initInputCellValues);
  const [cellValidation, setCellValidation] = useState<(boolean | null)[][]>(initCellValidation);
  const inputCellsRef = useRef<(HTMLInputElement | null)[][]>(initInputCells);

  return (
    <TableContext
      value={{
        inputCellValues,
        cellValidation,
        setInputCellValues,
        setCellValidation,
        inputCellsRef,
      }}
    >
      {children}
    </TableContext>
  );
};

export const useTableContext = () => {
  const context = use(TableContext);
  if (!context) {
    throw new Error("useSolutionTableContext must be used within a SolutionTableProvider");
  }
  return context;
};
