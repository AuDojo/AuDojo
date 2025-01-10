import { QuickSortBarData, QuickSortProps } from "../types";

/**
 * Transforms the current state of the array during the Quick Sort process into an array of QuickSortBarData objects.
 *
 * @param {number[]} props.currentArray - The current state of the array being sorted.
 * @param {number[]} props.previousArray - The state of the array from the previous step.
 * @param {number} props.numSteps - The total number of steps in the sorting process.
 * @param {number} props.i - The current step index.
 * @param {[number, number][]} props.pivotElement - The pivot elements for each step.
 *
 * @returns {QuickSortBarData[]} An array of QuickSortBarData objects containing the value, current index, previous index,
 * whether the element is a pivot, and whether the element is sorted.
 */
export const createQuickSortData = ({
  currentArray,
  previousArray,
  numSteps,
  i,
  pivotElement,
}: QuickSortProps): QuickSortBarData[] => {
  return currentArray.map((value, index) => {
    // Count occurrences of the current value up to the current index
    const occurrenceCount = currentArray.slice(0, index).filter((v) => v === value).length;

    // Find the position of the current value in the previous array
    const previousIndex = previousArray.findIndex((v, i) => {
      const prevOccurrences = previousArray.slice(0, i).filter((v2) => v2 === value).length;
      return v === value && prevOccurrences === occurrenceCount;
    });

    // Determine if the element is the pivot to be used in the current step
    const isPivot = i < numSteps - 1 ? index === pivotElement[i + 1][0] : false;

    // Determine if the element is sorted in the current step or final step
    //TODO: improve this
    const isSorted = i >= 1 ? index === pivotElement[i][1] : false;

    return {
      value,
      index,
      previousIndex,
      isPivot,
      isSorted: isSorted || i === numSteps - 1,
    };
  });
};
