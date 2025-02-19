import { BubbleSortBarData, BubbleSortProps } from "../types";

/**
 * Transforms the current state of the array during the Bubble Sort process into an array of BubbleSortBarData objects.
 *
 * @param {number[]} props.currentArray - The current state of the array being sorted.
 * @param {number} props.numSteps - The total number of steps in the sorting process.
 * @param {number} props.i - The current step index.
 * @param {number[]} props.bubbleElements - The indices of the elements that were last swapped.
 *
 * @returns {BubbleSortBarData[]} An array of BubbleSortBarData objects containing the value, current index, previous index,
 * whether the element is sorted, and whether the element was swapped in the last step.
 */
export const createBubbleSortData = ({
  currentArray,
  numSteps,
  i,
  bubbleElements,
}: BubbleSortProps): BubbleSortBarData[] => {
  return currentArray.map((value, index) => {
    // Determine indices of elements that were swapped in the previous step
    const firstElementSwap = i >= 1 ? bubbleElements[i - 1] : -2;
    const secondElementSwap = firstElementSwap + 1;

    // Calculate the previous index after swapping
    const previousIndex =
      index === firstElementSwap || index === secondElementSwap
        ? index === firstElementSwap
          ? secondElementSwap
          : firstElementSwap
        : index;

    // Determine if the element is considered sorted
    const isElementSorted = bubbleElements[i - 1] > bubbleElements[i];

    // Check if the element is sorted in the final step or if it is sorted according to the current step's swaps
    // TODO: improve checking condition
    const isSorted = i === numSteps - 1 || (isElementSorted && index >= bubbleElements[i - 1] + 1);

    // Determine if the current element was swapped in the last operation
    const isSwapped = index === bubbleElements[i - 1] || index - 1 === bubbleElements[i - 1];

    return {
      value,
      index,
      previousIndex,
      isSorted,
      isSwapped,
    };
  });
};
