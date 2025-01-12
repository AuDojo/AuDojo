import React, { createContext, useContext, useRef, useState } from "react";
import { useInitTableStates } from "../hooks/useInitTableStates";

interface TableContextProps {
  inputCellValues: string[][];
  setInputCellValues: React.Dispatch<React.SetStateAction<string[][]>>;

  cellValidation: (boolean | null)[][];
  setCellValidation: React.Dispatch<React.SetStateAction<(boolean | null)[][]>>;

  inputCellsRef: React.RefObject<(HTMLInputElement | null)[][]>;
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    inputCellValues: initCellValues,
    cellValidation: initCellValidation,
    inputCells: initInputCells,
  } = useInitTableStates();

  const [inputCellValues, setInputCellValues] = useState<string[][]>(initCellValues);
  const [cellValidation, setCellValidation] = useState<(boolean | null)[][]>(initCellValidation);
  const inputCellsRef = useRef<(HTMLInputElement | null)[][]>(initInputCells);

  return (
    <TableContext.Provider
      value={{
        inputCellValues,
        cellValidation,
        setInputCellValues,
        setCellValidation,
        inputCellsRef,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useSolutionTableContext must be used within a SolutionTableProvider");
  }
  return context;
};
