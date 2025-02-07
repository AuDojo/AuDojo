import { MAX_INPUT_RANGE, MIN_INPUT_RANGE } from "@/features/sortSensei/constants";
import { useSortContext } from "@/features/sortSensei/context/SortContext";
import { useTableContext } from "@/features/sortSensei/table/context/TableContext";
import React from "react";

export const useTableCell = () => {
  const { processList } = useSortContext();
  const {
    tableCellsRef: tableCellsRef,
    userInputTable: inputCellValues,
    setUserInputTable: setUserInputTable,
  } = useTableContext();

  /**
   * Focuses the input element at the given row and column index. This is used
   * to focus the cell after pressing given hotkeys to go to the next cell.
   * @param rowIndex The index of the row
   * @param columnIndex The index of the column
   */
  const focusCell = (rowIndex: number, columnIndex: number): void => {
    const inputElement = tableCellsRef.current[rowIndex]?.[columnIndex];
    if (inputElement) {
      // Focus the input element in the table
      inputElement.focus();

      // Select the entire input
      const length = inputElement.value.length;
      setTimeout(() => inputElement.setSelectionRange(0, length), 0);
    }
  };

  /**
   * Updates the state of the input values in the row when a user types in a new value.
   * Checks if the input value is either empty or a valid number (less than or equal to 40)
   * and only updates the state if the input passes this check.
   * @param value The new value of the input
   * @param columnIndex The index of the input in the row
   */
  const handleCellChange = (value: string, rowIndex: number, columnIndex: number): void => {
    // Check if input is too long
    if (value.length > 2) return;

    // Check if the input value is either empty or a valid number
    if ((Number(value) >= MIN_INPUT_RANGE && Number(value) <= MAX_INPUT_RANGE) || value === "") {
      const updatedValues = [...inputCellValues];
      updatedValues[rowIndex][columnIndex] = value; // Update the specific index with new value
      setUserInputTable(updatedValues); // Update the state
    }
  };

  /**
   * Handles pressed keys. WASD to move in the table, 'Escape' to unfocus the current input field
   * @param event The keyboard event
   * @param columnIndex The index of the column
   */
  const handleCellKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number
  ): void => {
    const { key, shiftKey } = event;
    const stepList = processList[rowIndex];

    if (key === "ArrowLeft") {
      // Move to the previous field
      if (columnIndex === 0) {
        focusCell(rowIndex - 1, stepList.length - 1);
      } else {
        focusCell(rowIndex, columnIndex - 1);
      }
    } else if (key === "ArrowRight") {
      // Move to the next input field
      if (columnIndex === stepList.length - 1) {
        focusCell(rowIndex + 1, 0);
      } else {
        focusCell(rowIndex, columnIndex + 1);
      }
    } else if ((key === "Enter" && !shiftKey) || key === "ArrowDown") {
      // Move down
      focusCell(rowIndex + 1, columnIndex);
    } else if ((key === "Enter" && shiftKey) || key === "ArrowUp") {
      // Move up
      focusCell(rowIndex - 1, columnIndex);
    } else if (key === "Escape") {
      // Unfocus the input field
      (event.target as HTMLInputElement).blur();
    }
  };

  return { focusCell, handleCellChange, handleCellKeyDown };
};
