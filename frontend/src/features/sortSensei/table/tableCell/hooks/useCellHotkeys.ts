import { HOTKEYS } from "@/config/hotkeyMap";
import { Options, useHotkeys } from "react-hotkeys-hook";
import { useTableContext } from "../../context";

export const useCellHotkeys = (row: number, column: number) => {
  const { userInputTable, tableCellsRef } = useTableContext();
  const currentRow = userInputTable[row];
  const hotkeyConfig: Options = { enabled: true, enableOnFormTags: ["INPUT"] };

  /**
   * Focuses the input element at the given row and column index. This is used
   * to focus the cell after pressing given hotkeys to go to the next cell.
   */
  const focusCell = (rowIndex: number, columnIndex: number): void => {
    const inputElement = tableCellsRef.current[rowIndex]?.[columnIndex];
    if (inputElement) {
      // Focus the input element in the table
      inputElement.focus();

      // Select the entire input
      inputElement.select();
    }
  };

  const leftRef = useHotkeys<HTMLInputElement>(
    HOTKEYS.table.moveLeft,
    (event) =>
      // Move to the previous field
      {
        event.preventDefault();
        if (column === 0) {
          focusCell(row - 1, currentRow.length - 1);
        } else {
          focusCell(row, column - 1);
        }
      },
    hotkeyConfig,
    [row, column]
  );

  const rightRef = useHotkeys<HTMLInputElement>(
    HOTKEYS.table.moveRight,
    (event) => {
      // Move to the next input field
      event.preventDefault();
      if (column === currentRow.length - 1) {
        focusCell(row + 1, 0);
      } else {
        focusCell(row, column + 1);
      }
    },
    hotkeyConfig,
    [row, column]
  );

  const downRef = useHotkeys<HTMLInputElement>(
    HOTKEYS.table.moveDown,
    (event) => {
      // Move down
      event.preventDefault();
      focusCell(row + 1, column);
    },
    hotkeyConfig,
    [row, column]
  );

  const upRef = useHotkeys<HTMLInputElement>(
    HOTKEYS.table.moveUp,
    (event) => {
      // Move up
      event.preventDefault();
      focusCell(row - 1, column);
    },
    hotkeyConfig,
    [row, column]
  );

  const escRef = useHotkeys<HTMLInputElement>(
    HOTKEYS.table.escape,
    (event) => {
      event.preventDefault();
      // Unfocus the input field
      (event.target as HTMLInputElement).blur();
    },
    hotkeyConfig,
    [row, column]
  );

  return [leftRef, rightRef, downRef, upRef, escRef];
};
