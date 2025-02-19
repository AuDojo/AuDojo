import { HOTKEYS } from "@/config/hotkeyMap";
import { useTutorialModalContext } from "@/features/sortSensei/context";
import { Options, useHotkeys } from "react-hotkeys-hook";
import { useTableContext } from "../../context";

export const useCellHotkeys = (row: number, column: number) => {
  const { userInputTable, tableCellsRef } = useTableContext();
  const { isTutorialOpen } = useTutorialModalContext();
  const currentRow = userInputTable[row];
  const hotkeyConfig: Options = { enabled: !isTutorialOpen, enableOnFormTags: ["INPUT"], preventDefault: true };

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
    () =>
      // Move to the previous field
      {
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
    () => {
      // Move to the next input field
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
    () => {
      // Move down
      focusCell(row + 1, column);
    },
    hotkeyConfig,
    [row, column]
  );

  const upRef = useHotkeys<HTMLInputElement>(
    HOTKEYS.table.moveUp,
    () => {
      // Move up
      focusCell(row - 1, column);
    },
    hotkeyConfig,
    [row, column]
  );

  const escRef = useHotkeys<HTMLInputElement>(
    HOTKEYS.table.unfocus,
    (event) => {
      // Unfocus the input field
      (event.target as HTMLInputElement).blur();
    },
    hotkeyConfig,
    [row, column]
  );

  return [leftRef, rightRef, downRef, upRef, escRef];
};
