import { SortTypes } from "@/features/sortSensei/constants";
import { useSortContext } from "@/features/sortSensei/context/SortContext";
import { mergeRefs } from "@/lib/mergeRefs";
import classNames from "classnames/bind";
import { JSX, useMemo } from "react";
import { useTableContext } from "../context/TableContext";
import { useCellChange, useCellHotkeys } from "./hooks";
import styles from "./TableCell.module.css";

interface TableCellProps {
  rowIndex: number;
  columnIndex: number;
}

// Bind styles to classNames
const cx = classNames.bind(styles);

const InputCell = ({ rowIndex, columnIndex }: TableCellProps): JSX.Element => {
  const { processList, step, mergeRanges, sortTypeRef, pivotElements, selectionElements, bubbleElements } =
    useSortContext();
  const { userInputTable, tableCellsRef, cellsValidation } = useTableContext();
  const { handleCellChange } = useCellChange();
  const hotkeyRefs = useCellHotkeys(rowIndex, columnIndex);

  // Memoize derived values to prevent unnecessary re-renders
  const cellData = useMemo(() => {
    const sortType = sortTypeRef.current;
    const num = processList[rowIndex][columnIndex];
    const inputCellValue = userInputTable[rowIndex]?.[columnIndex] || "";
    const validation = cellsValidation[rowIndex][columnIndex];

    let pivotPair: [number, number];
    if (sortType === SortTypes.QuickSort && pivotElements) {
      if (rowIndex < pivotElements.length) {
        pivotPair = pivotElements[rowIndex];
      } else {
        pivotPair = [-1, -1];
      }
    } else {
      pivotPair = [-1, -1];
    }

    // Calculate merge range
    const currentmergeRanges =
      sortType === SortTypes.MergeSort && mergeRanges ? mergeRanges[rowIndex] || [-1, -1] : [-1, -1];

    // Check if column is in merge range
    const isInmergeRanges = () => columnIndex >= currentmergeRanges[0] && columnIndex <= currentmergeRanges[1];

    // Check if element is pivot
    const isPivot = () => columnIndex === pivotPair[1];

    const isSelected = (): boolean => {
      if (sortTypeRef.current === SortTypes.SelectionSort && rowIndex < step) {
        return columnIndex === selectionElements[rowIndex - 1] || columnIndex === rowIndex - 1;
      }
      return false;
    };

    return {
      sortType,
      num,
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
    rowIndex,
    columnIndex,
    userInputTable,
    cellsValidation,
    pivotElements,
    mergeRanges,
    step,
    selectionElements,
  ]);

  // Tooltip content for incorrect input
  const tooltipContent = cellData.inputCellValue ? `Your input: ${cellData.inputCellValue}` : "Missing input";

  return (
    <td
      {...(cellData.validation === false
        ? { "aria-label": tooltipContent, "data-tooltip": "top 200" } /* Tooltip */
        : {})}
    >
      <input
        className={cx("cell-input", {
          // Cell Validation styles
          correct: cellData.validation === true,
          incorrect: cellData.validation === false,
          "pivot-cell": cellData.isPivot && rowIndex < step,

          // MergeSort styles
          "in-merge-range": cellData.sortType === SortTypes.MergeSort && cellData.isInmergeRanges && rowIndex < step,
          "merge-range-start":
            cellData.sortType === SortTypes.MergeSort && columnIndex === cellData.mergeRanges[0] && rowIndex < step,
          "merge-range-end":
            cellData.sortType === SortTypes.MergeSort && columnIndex === cellData.mergeRanges[1] && rowIndex < step,

          // SelectionSort styles
          "selected-cell": cellData.isSelected,

          // BubbleSort styles
          "bubble-cell-first":
            cellData.sortType === SortTypes.BubbleSort &&
            columnIndex === bubbleElements[rowIndex - 1] &&
            rowIndex < step,
          "bubble-cell-second":
            cellData.sortType === SortTypes.BubbleSort &&
            columnIndex === bubbleElements[rowIndex - 1] + 1 &&
            rowIndex < step,
        })}
        value={rowIndex < step ? cellData.num || "" : cellData.inputCellValue}
        readOnly={rowIndex < step}
        ref={mergeRefs(
          (el) => {
            if (tableCellsRef.current[rowIndex]) {
              tableCellsRef.current[rowIndex][columnIndex] = el;
            }
          },
          ...hotkeyRefs
        )}
        onChange={(event) => rowIndex >= step && handleCellChange(event.target.value, rowIndex, columnIndex)}
        placeholder={rowIndex === 1 && columnIndex === 0 ? "Edit" : ""}
      />
    </td>
  );
};

export default InputCell;
