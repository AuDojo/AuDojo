/**
 * Gets initial table state arrays for input cell values, cell validation, and input cells references.
 *
 * @param processList - The initial array of numbers used to populate the first row of input cell values.
 * @returns An object containing:
 *  - `initInputCellValues`: A 2D array with the first row containing the initial numbers and the rest filled with empty strings.
 *  - `initCellValidation`: A 2D array filled with `null` values, representing the validation state of each cell.
 *  - `initInputCells`: A 2D array of `null` references for input cell elements.
 */
export const getInitTableStates = (processList: number[][]) => {
  if (!processList || processList.length === 0) {
    return {
      initInputCellValues: [],
      initCellValidation: [],
      initInputCells: [],
    };
  }

  // Initialize cell validation array
  const initCellValidation = processList.map((row) => row.map(() => null));

  // Initialize input cell values array
  const initInputCellValues = processList.map((row, index) =>
    index === 0 ? [...row.map((num) => num.toString())] : row.map(() => "")
  );

  // Initialize input cells array
  const initInputCells = processList.map((row) => row.map(() => null));

  return { initInputCellValues, initCellValidation, initInputCells };
};
