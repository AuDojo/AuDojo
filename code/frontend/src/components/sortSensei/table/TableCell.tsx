import { SortType } from "@constants/index";
import { useSortContext } from "@hooks/index";
import { useTableUtils } from "@src/hooks/useTableUtils";
import styles from "@styles/sortSensei/TableCell.module.css";
import classNames from "classnames/bind";
import { JSX, useMemo } from "react";
import Tooltip from "../Tooltip";

interface TableCellProps {
  rowIndex: number;
  columnIndex: number;
}

// Bind styles to classNames
const cx = classNames.bind(styles);

const TableCell: React.FC<TableCellProps> = ({ rowIndex, columnIndex }): JSX.Element => {
  const { stepsList, step, mergeRanges, sortTypeRef, inputCellValues, inputCellsRef, cellValidation, pivotElement } =
    useSortContext();

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

    return {
      sortType,
      num,
      inputCellValue,
      validation,
      mergeRange,
      isInMergeRange: isInMergeRange(),
      isPivot: isPivot(),
    };
  }, [rowIndex, columnIndex, stepsList, inputCellValues, cellValidation, mergeRanges, sortTypeRef, pivotElement]);

  return (
    <Tooltip
      delay={0}
      direction="top"
      content={cellData.inputCellValue ? `Wrong: ${cellData.inputCellValue}` : "Missing input"}
      hidden={cellData.validation !== false}
    >
      <input
        className={cx("cell-input", {
          "in-merge-range": cellData.sortType === SortType.MergeSort && cellData.isInMergeRange && rowIndex < step,
          "merge-range-start":
            cellData.sortType === SortType.MergeSort && columnIndex === cellData.mergeRange[0] && rowIndex < step,
          "merge-range-end":
            cellData.sortType === SortType.MergeSort && columnIndex === cellData.mergeRange[1] && rowIndex < step,
          correct: cellData.validation === true,
          incorrect: cellData.validation === false,
          "pivot-cell": cellData.isPivot && rowIndex < step,
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
    </Tooltip>
  );
};

export default TableCell;
