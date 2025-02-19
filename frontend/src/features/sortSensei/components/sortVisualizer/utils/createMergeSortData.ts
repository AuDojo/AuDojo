import { MergeSortBarData, MergeSortProps } from "../types";

/**
 * Transforms the current state of the array during the Merge Sort process into an array of MergeSortBarData objects.
 *
 * @param {number[]} props.currentArray - The current state of the array being sorted.
 * @param {number[]} props.previousArray - The state of the array from the previous step.
 * @param {number} props.numSteps - The total number of steps in the sorting process.
 * @param {number} props.i - The current step index.
 * @param {[number, number][]} props.mergeRanges - The ranges of indices that have been merged in the current step.
 *
 * @returns {MergeSortBarData[]} An array of MergeSortBarData objects containing the value, current index, previous index,
 * whether the element is sorted, and whether the element is part of a merged range.
 */
export const createMergeSortData = ({
  currentArray,
  previousArray,
  numSteps,
  i,
  mergeRanges,
}: MergeSortProps): MergeSortBarData[] => {
  return currentArray.map((value, index) => {
    // Count occurrences of the current value up to the current index
    const occurrenceCount = currentArray.slice(0, index).filter((v) => v === value).length;

    // Find the position of the current value in the previous array
    const previousIndex = previousArray.findIndex((v, i) => {
      const prevOccurrences = previousArray.slice(0, i).filter((v2) => v2 === value).length;
      return v === value && prevOccurrences === occurrenceCount;
    });

    // Determine if the element is sorted in the final step
    const isSorted = i === numSteps - 1;

    // Determine if the element is part of a merged range in the current step
    const isMerged = mergeRanges[i] && index >= mergeRanges[i][0] && index <= mergeRanges[i][1];

    return {
      value,
      index,
      previousIndex,
      isSorted,
      isMerged,
    };
  });
};

export default createMergeSortData;
