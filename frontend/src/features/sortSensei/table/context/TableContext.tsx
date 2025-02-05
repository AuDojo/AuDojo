import { useSortContext } from "@/features/sortSensei/context";
import React, { createContext, use, useRef, useState } from "react";
import { getInitTableStates } from "../utils/tableUtils";

interface TableContextProps {
  userInputTable: string[][];
  setUserInputTable: React.Dispatch<React.SetStateAction<string[][]>>;

  cellsValidation: (boolean | null)[][];
  setCellsValidation: React.Dispatch<React.SetStateAction<(boolean | null)[][]>>;

  tableCellsRef: React.RefObject<(HTMLInputElement | null)[][]>;
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const { processList } = useSortContext();
  const { initInputCellValues, initCellValidation, initInputCells } = getInitTableStates(processList);

  const [userInputTable, setUserInputTable] = useState<string[][]>(initInputCellValues);
  const [cellsValidation, setCellsValidation] = useState<(boolean | null)[][]>(initCellValidation);
  const tableCellsRef = useRef<(HTMLInputElement | null)[][]>(initInputCells);

  return (
    <TableContext
      value={{
        userInputTable,
        cellsValidation,
        setUserInputTable,
        setCellsValidation,
        tableCellsRef,
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
