import classNames from "classnames/bind";
import React from "react";
import { INPUT_NUMBER_RANGE, SortType } from "../../constants";
import { useSortContext } from "../../hooks/sortContextHooks";
import styles from "../../styles/sortSensei/SortingTable.module.css";

interface RowProps {
  rowIndex: number;
  sortType: SortType;
}

// Bind styles to classNames
const cx = classNames.bind(styles);

/**
 * A component to render a single row of the sorting table.
 * @param rowIndex The index of the row
 * @param sortType The type of sorting algorithm, e.g. bubblesort or mergesort
 */
const TableRow = ({ rowIndex, sortType }: RowProps) => {
  // Access the context values
  const {
    stepsList,
    step,
    mergeRanges,
    inputCellsRef,
    inputCellValues,
    cellValidation,
    setInputCellValues,
  } = useSortContext();
  const mergeRange = mergeRanges[rowIndex];
  const stepList = stepsList[rowIndex];
  const validation = cellValidation[rowIndex];

  /**
   * Updates the state of the input values in the row when a user types in a new value.
   * Checks if the input value is either empty or a valid number (less than or equal to 40)
   * and only updates the state if the input passes this check.
   * @param value The new value of the input
   * @param columnIndex The index of the input in the row
   */
  const handleChange = (value: string, columnIndex: number): void => {
    // Check if the input value is either empty or a valid number
    if (
      (Number(value) >= INPUT_NUMBER_RANGE.min &&
        Number(value) <= INPUT_NUMBER_RANGE.max) ||
      value === ""
    ) {
      const updatedValues = [...inputCellValues];
      updatedValues[rowIndex][columnIndex] = value; // Update the specific index with new value
      setInputCellValues(updatedValues); // Update the state
    }
  };

  /**
   * Focuses the input element at the given row and column index. This is used
   * to focus the cell after pressing the Enter key to go to the next cell.
   * @param rowIndex The index of the row
   * @param columnIndex The index of the column
   */
  const focusCell = (rowIndex: number, columnIndex: number): void => {
    const inputElement = inputCellsRef.current[rowIndex]?.[columnIndex];
    if (inputElement) {
      inputCellsRef.current[rowIndex][columnIndex].focus();
    }
  };

  /**
   * Handles pressed keys. WASD to move in the table, 'Escape' to unfocus the current input field
   * @param event The keyboard event
   * @param columnIndex The index of the column
   */
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    columnIndex: number
  ): void => {
    const { key, shiftKey } = event;
    if ((key === "Enter" && shiftKey) || key === "a") {
      // Move to the previous field
      if (columnIndex === 0) {
        focusCell(rowIndex - 1, stepList.length - 1);
      } else {
        focusCell(rowIndex, columnIndex - 1);
      }
    } else if ((key === "Enter" && !shiftKey) || key === "d") {
      // Move to the next input field
      if (columnIndex === stepList.length - 1) {
        focusCell(rowIndex + 1, 0);
      } else {
        focusCell(rowIndex, columnIndex + 1);
      }
    } else if (key === "s" || key === "ArrowDown") {
      // Move down
      focusCell(rowIndex + 1, columnIndex);
    } else if (key === "w" || key === "ArrowUp") {
      // Move up
      focusCell(rowIndex - 1, columnIndex);
    } else if (key === "Escape") {
      // Unfocus the input field
      (event.target as HTMLInputElement).blur();
    }
  };

  /**
   * Checks if the given column index is within the current merge range.
   * @param columnIndex The column index to check
   * @returns True if the column index is within the merge range, false otherwise
   */
  const isInMergeRange = (columnIndex: number): boolean => {
    return columnIndex >= mergeRange[0] && columnIndex <= mergeRange[1];
  };

  return (
    <div className={cx("row-container")}>
      <span className={cx("row-index")}>{rowIndex}</span>
      {stepList.map((num, columnIndex) => (
        <input
          key={columnIndex}
          className={cx("cell-input", {
            "in-merge-range":
              sortType === SortType.MergeSort &&
              isInMergeRange(columnIndex) &&
              rowIndex < step,
            "merge-range-start":
              sortType === SortType.MergeSort &&
              columnIndex === mergeRange[0] &&
              rowIndex < step,
            "merge-range-end":
              sortType === SortType.MergeSort &&
              columnIndex === mergeRange[1] &&
              rowIndex < step,
            correct: validation[columnIndex] === true, // Correct user input
            incorrect: validation[columnIndex] === false, // Incorrect user input
          })}
          value={
            rowIndex < step ? num || "" : inputCellValues[rowIndex][columnIndex]
          } // Show number for index below step, or value from state otherwise
          readOnly={rowIndex < step} // Make read-only if index is below current step
          ref={(el) => {
            // Assign the input element to the appropriate cell in the ref
            if (inputCellsRef.current[rowIndex]) {
              inputCellsRef.current[rowIndex][columnIndex] = el!;
            }
          }}
          onChange={
            (event) =>
              rowIndex >= step && handleChange(event.target.value, columnIndex) // Update value
          }
          onKeyDown={(event) => handleKeyDown(event, columnIndex)}
        />
      ))}
    </div>
  );
};

export default TableRow;
