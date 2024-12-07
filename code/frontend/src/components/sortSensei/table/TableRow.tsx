import { SortType } from "@constants/index";
import { useSortContext } from "@hooks/index";
import { useTableUtils } from "@src/hooks/useTableUtils";
import styles from "@styles/sortSensei/SortingTable.module.css";
import classNames from "classnames/bind";
import Tooltip from "../Tooltip";

interface RowProps {
  rowIndex: number;
}

// Bind styles to classNames
const cx = classNames.bind(styles);

/**
 * A component to render a single row of the sorting table.
 * @param rowIndex The index of the row
 */
const TableRow = ({ rowIndex }: RowProps) => {
  // Access the context values
  const { stepsList, step, mergeRanges, inputCellsRef, sortTypeRef, inputCellValues, cellValidation } =
    useSortContext();

  const { handleCellChange, handleCellKeyDown } = useTableUtils();

  const sortType = sortTypeRef.current;
  let mergeRange: [number, number];
  switch (sortType) {
    case SortType.MergeSort: {
      if (mergeRanges) {
        mergeRange = mergeRanges[rowIndex] || [-1, -1];
      }
      break;
    }
    case SortType.QuickSort:
    case SortType.BubbleSort:
    case SortType.SelectionSort:
  }
  const stepList = stepsList[rowIndex];
  const validation = cellValidation[rowIndex];

  /**
   * Checks if the given column index is within the current merge range.
   * @param columnIndex The column index to check
   * @returns True if the column index is within the merge range, false otherwise
   */
  const isInMergeRange = (columnIndex: number): boolean => {
    if (!mergeRange) return false;
    return columnIndex >= mergeRange[0] && columnIndex <= mergeRange[1];
  };

  return (
    <tr className={cx("row-container")} key={rowIndex}>
      <th className={cx("row-index")}>{rowIndex}</th>
      {stepList.map((num, columnIndex) => (
        <td key={columnIndex}>
          <Tooltip
            delay={0}
            direction="top"
            content={
              inputCellValues[rowIndex][columnIndex]
                ? `Wrong: ${inputCellValues[rowIndex][columnIndex]}`
                : "Missing input"
            }
            hidden={validation[columnIndex] !== false}
          >
            <input
              className={cx("cell-input", {
                "in-merge-range": sortType === SortType.MergeSort && isInMergeRange(columnIndex) && rowIndex < step,
                "merge-range-start":
                  sortType === SortType.MergeSort && columnIndex === mergeRange[0] && rowIndex < step,
                "merge-range-end": sortType === SortType.MergeSort && columnIndex === mergeRange[1] && rowIndex < step,
                correct: validation[columnIndex] === true, // Correct user input
                incorrect: validation[columnIndex] === false, // Incorrect user input
              })}
              value={rowIndex < step ? num || "" : inputCellValues[rowIndex][columnIndex]} // Show number for index below step, or value from state otherwise
              readOnly={rowIndex < step} // Make read-only if index is below current step
              ref={(el) => {
                // Assign the input element to the appropriate cell in the ref
                if (inputCellsRef.current[rowIndex]) {
                  inputCellsRef.current[rowIndex][columnIndex] = el!;
                }
              }}
              onChange={
                (event) => rowIndex >= step && handleCellChange(event.target.value, rowIndex, columnIndex) // Update value
              }
              onKeyDown={(event) => handleCellKeyDown(event, rowIndex, columnIndex)}
              placeholder={rowIndex === 1 && columnIndex === 0 ? "Edit" : ""}
            />
          </Tooltip>
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
