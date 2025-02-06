import { useCallback } from "react";
import { getInitTableStates } from "../utils/tableUtils";
import { useTableContext } from "@/features/sortSensei/table/context";
import { useSortContext } from "@/features/sortSensei/context";
/**
 * Hook to reset the sorting table to its initial state based on the given input array.
 */
export const useResetTable = () => {
  const {
    setCellsValidation: setCellsValidation,
    setUserInputTable: setUserInputTable,
    tableCellsRef: tableCellsRef,
  } = useTableContext();
  const { processList, setStep } = useSortContext();

  const resetTable = useCallback(() => {
    // get the initial table states based on the givenarray
    const { initInputCellValues, initCellValidation, initInputCells } = getInitTableStates(processList);

    // reset cells
    setUserInputTable(initInputCellValues);
    setCellsValidation(initCellValidation);
    tableCellsRef.current = initInputCells;
    setStep(1);
  }, [processList, setUserInputTable, setCellsValidation, tableCellsRef, setStep]);

  return { resetTable };
};
