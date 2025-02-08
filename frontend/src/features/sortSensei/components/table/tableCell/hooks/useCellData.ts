import { SortTypes } from "@/features/sortSensei/constants";
import { useSortContext } from "@/features/sortSensei/context/SortContext";
import { useMemo } from "react";
import { useTableContext } from "../../context/TableContext";

/**
 * A hook that returns the cell data for the given row and column.
 *
 * @param {number} row The row of the cell
 * @param {number} column The column of the cell
 * @returns An object with the cell data
 */
export const useCellData = (row: number, column: number) => {
  const { processList, step, mergeRanges, sortTypeRef, pivotElements, selectionElements } = useSortContext();
  const { userInputTable, cellsValidation } = useTableContext();

  const cellData = useMemo(() => {
    const sortType = sortTypeRef.current;
    const value = processList[row][column];
    const inputCellValue = userInputTable[row]?.[column] || "";
    const validation = cellsValidation[row][column];

    // Store the pivot pair for the current step
    let pivotPair: [number, number];
    if (sortType === SortTypes.QuickSort && pivotElements) {
      if (row < pivotElements.length) {
        pivotPair = pivotElements[row];
      } else {
        pivotPair = [-1, -1];
      }
    } else {
      pivotPair = [-1, -1];
    }

    // Store the merge range for the current step
    const currentmergeRanges =
      sortType === SortTypes.MergeSort && mergeRanges ? mergeRanges[row] || [-1, -1] : [-1, -1];

    // Check if column is in merge range
    const isInmergeRanges = () => column >= currentmergeRanges[0] && column <= currentmergeRanges[1];

    // Check if element is pivot
    const isPivot = () => column === pivotPair[1];

    // Check if element is selected
    const isSelected = (): boolean => {
      if (sortTypeRef.current === SortTypes.SelectionSort && row < step) {
        return column === selectionElements[row - 1] || column === row - 1;
      }
      return false;
    };

    // Return the cell data
    return {
      sortType,
      value,
      inputCellValue,
      validation,
      mergeRanges: currentmergeRanges,
      isInmergeRanges: isInmergeRanges(),
      isPivot: isPivot(),
      isSelected: isSelected(),
    };
  }, [
    sortTypeRef,
    processList,
    row,
    column,
    userInputTable,
    cellsValidation,
    pivotElements,
    mergeRanges,
    step,
    selectionElements,
  ]);

  return cellData;
};
