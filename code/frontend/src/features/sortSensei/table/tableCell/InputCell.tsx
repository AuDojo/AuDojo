import { SortType } from "@/constants";
import { useSortContext } from "@/hooks";
import { useTableUtils } from "@features/sortSensei/table/hooks";
import classNames from "classnames/bind";
import { JSX, useMemo } from "react";
import styles from "./TableCell.module.css";

interface TableCellProps {
  rowIndex: number;
  columnIndex: number;
}

// Bind styles to classNames
const cx = classNames.bind(styles);

const InputCell = ({ rowIndex, columnIndex }: TableCellProps): JSX.Element => {
  const {
    stepsList,
    step,
    mergeRanges,
    sortTypeRef,
    inputCellValues,
    inputCellsRef,
    cellValidation,
    pivotElement,
    selectionElement,
    bubbleElement,
  } = useSortContext();

  const { handleCellChange, handleCellKeyDown } = useTableUtils();

  // Memoize derived values to prevent unnecessary re-renders
  const cellData = useMemo(() => {
    const sortType = sortTypeRef.current;
    const num = stepsList[rowIndex][columnIndex];
    const inputCellValue = inputCellValues[rowIndex][columnIndex];
    const validation = cellValidation[rowIndex][columnIndex];

    let pivotPair: [number, number];
    if (sortType === SortType.QuickSort && pivotElement) {
      if (rowIndex < pivotElement.length) {
        pivotPair = pivotElement[rowIndex];
      } else {
        pivotPair = [-1, -1];
      }
    } else {
      pivotPair = [-1, -1];
    }

    // Calculate merge range
    const mergeRange = sortType === SortType.MergeSort && mergeRanges ? mergeRanges[rowIndex] || [-1, -1] : [-1, -1];

    // Check if column is in merge range
    const isInMergeRange = () => columnIndex >= mergeRange[0] && columnIndex <= mergeRange[1];

    // Check if element is pivot
    const isPivot = () => columnIndex === pivotPair[1];

    const isSelected = (): boolean => {
      if (sortTypeRef.current === SortType.SelectionSort && rowIndex < step) {
        return columnIndex === selectionElement[rowIndex - 1] || columnIndex === rowIndex - 1;
      }
      return false;
    };

    return {
      sortType,
      num,
      inputCellValue,
      validation,
      mergeRange,
      isInMergeRange: isInMergeRange(),
      isPivot: isPivot(),
      isSelected: isSelected(),
    };
  }, [rowIndex, columnIndex, stepsList, inputCellValues, cellValidation, mergeRanges, sortTypeRef, pivotElement]);

  // Tooltip content for incorrect input
  const tooltipContent = cellData.inputCellValue ? `Wrong: ${cellData.inputCellValue}` : "Missing input";

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
          "in-merge-range": cellData.sortType === SortType.MergeSort && cellData.isInMergeRange && rowIndex < step,
          "merge-range-start":
            cellData.sortType === SortType.MergeSort && columnIndex === cellData.mergeRange[0] && rowIndex < step,
          "merge-range-end":
            cellData.sortType === SortType.MergeSort && columnIndex === cellData.mergeRange[1] && rowIndex < step,

          // SelectionSort styles
          "selected-cell": cellData.isSelected,

          // BubbleSort styles
          "bubble-cell-first":
            cellData.sortType === SortType.BubbleSort && columnIndex === bubbleElement[rowIndex - 1] && rowIndex < step,
          "bubble-cell-second":
            cellData.sortType === SortType.BubbleSort &&
            columnIndex === bubbleElement[rowIndex - 1] + 1 &&
            rowIndex < step,
        })}
        value={rowIndex < step ? cellData.num || "" : cellData.inputCellValue}
        readOnly={rowIndex < step}
        ref={(el) => {
          if (inputCellsRef.current[rowIndex]) {
            inputCellsRef.current[rowIndex][columnIndex] = el!;
          }
        }}
        onChange={(event) => rowIndex >= step && handleCellChange(event.target.value, rowIndex, columnIndex)}
        onKeyDown={(event) => handleCellKeyDown(event, rowIndex, columnIndex)}
        placeholder={rowIndex === 1 && columnIndex === 0 ? "Edit" : ""}
      />
    </td>
  );
};

export default InputCell;
