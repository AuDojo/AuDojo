import { useCallback } from "react";
import { getInitTableStates } from "../utils/tableUtils";
import { useTableContext } from "@/features/sortSensei/table/context";
import { useSortContext } from "@/features/sortSensei/context";
/**
 * Hook to reset the sorting table to its initial state based on the given input array.
 */
export const useResetTable = () => {
  const { setCellValidation, setInputCellValues,  inputCellsRef } = useTableContext();
  const { processList } = useSortContext();

  const resetTable = useCallback(() => {
    // get the initial table states based on the givenarray
    const { initInputCellValues, initCellValidation, initInputCells } = getInitTableStates(processList);

    // reset cells
    setInputCellValues(initInputCellValues);
    setCellValidation(initCellValidation);
    inputCellsRef.current = initInputCells;
  }, [setInputCellValues, setCellValidation, inputCellsRef, processList]);

  return { resetTable };
};
