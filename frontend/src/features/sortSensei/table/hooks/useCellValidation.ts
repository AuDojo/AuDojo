import { useMemo } from "react";

/**
 * Returns an object with the current number of correct inputs and the total number of inputs.
 * @param cellValidation - 2D array of boolean values indicating correctness of each cell
 * @returns object with `currentPoints` and `totalPoints` properties
 */
export const useCellValidation = (cellValidation: (boolean | null)[][]) => {
  const validationObj = useMemo(() => {
    // Filter correct inputs
    const currentPoints = cellValidation.flat().filter((value) => value === true).length;

    // Filter total amount of points
    const totalPoints = cellValidation.slice(1).flat().length;

    return { currentPoints, totalPoints };
  }, [cellValidation]);

  return validationObj;
};
