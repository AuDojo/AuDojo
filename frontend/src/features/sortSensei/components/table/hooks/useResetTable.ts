import { useGetCachedData } from "@/features/sortSensei/api/postArray";
import { useTableContext } from "@/features/sortSensei/components/table/context";
import { useSortContext } from "@/features/sortSensei/context";
import { setRefValue } from "@/utils/updateValue";
import { useCallback } from "react";
import { getInitTableStates } from "../utils/tableUtils";
/**
 * Hook to reset the sorting table to its initial state based on the given input array.
 */
export const useResetTable = () => {
  const { setCellsValidation, setUserInputTable, tableCellsRef } = useTableContext();
  const { processList, setStep } = useSortContext();
  const { getCachedData } = useGetCachedData();

  const resetTable = useCallback(
    (array: number[]) => {
      // Check for cached data
      const cachedData = getCachedData(array);
      const newProcessList = cachedData?.processList ?? processList;

      // get the initial table states based on the givenarray
      const { initInputCellValues, initCellValidation, initInputCells } = getInitTableStates(newProcessList);

      // reset cells
      setUserInputTable(initInputCellValues);
      setCellsValidation(initCellValidation);
      setRefValue(tableCellsRef, initInputCells);
      setStep(1);
    },
    [getCachedData, processList, setUserInputTable, setCellsValidation, tableCellsRef, setStep]
  );

  return { resetTable };
};
