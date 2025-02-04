/**
 * Initializes table state arrays for input cell values, cell validation, and input cells references.
 *
 * @param array - The initial array of numbers used to populate the first row of input cell values.
 * @returns An object containing:
 *  - `initInputCellValues`: A 2D array with the first row containing the initial numbers and the rest filled with empty strings.
 *  - `initCellValidation`: A 2D array filled with `null` values, representing the validation state of each cell.
 *  - `initInputCells`: A 2D array of `null` references for input cell elements.
 */
export const initTableStates = (array: number[]) => {
  if (!array || array.length === 0) {
    return {
      initInputCellValues: [],
      initCellValidation: [],
      initInputCells: [],
    };
  }

  // Initialize cell validation array
  const initCellValidation = array.map(() => new Array<boolean | null>(array.length).fill(null));

  // Initialize input cell values array
  const initInputCellValues = array.map((_, index) =>
    index === 0 ? [...array.map((num) => num.toString())] : new Array<string>(array.length).fill("")
  );

  // Initialize input cells array
  const initInputCells = array.map(() => new Array<HTMLInputElement | null>(array.length).fill(null));

  return { initInputCellValues, initCellValidation, initInputCells };
};
