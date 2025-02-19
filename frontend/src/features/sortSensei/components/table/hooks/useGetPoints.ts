import { useMemo } from "react";

/**
 * Returns an object with the current number of correct inputs and the total number of inputs.
 * @param cellsValidation - 2D array of boolean values indicating correctness of each cell
 * @returns object with `currentPoints` and `totalPoints` properties
 */
export const useGetPoints = (cellsValidation: (boolean | null)[][]) => {
  const validationObj = useMemo(() => {
    // Filter correct inputs
    const currentPoints = cellsValidation.flat().filter((value) => value === true).length || 0;

    // Filter total amount of points
    const totalPoints = cellsValidation.slice(1).flat().length || 0;

    return { currentPoints, totalPoints };
  }, [cellsValidation]);

  return validationObj;
};
