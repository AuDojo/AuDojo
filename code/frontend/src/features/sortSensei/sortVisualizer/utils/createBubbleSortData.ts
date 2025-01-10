import { BubbleSortBarData, BubbleSortProps } from "../types";

export const createBubbleSortData = ({
  currentArray,
  numSteps,
  i,
  bubbleElement,
}: BubbleSortProps): BubbleSortBarData[] => {
  return currentArray.map((value, index) => {
    // Determine indices of elements that were swapped in the previous step
    const firstElementSwap = i >= 1 ? bubbleElement[i - 1] : -2;
    const secondElementSwap = firstElementSwap + 1;

    // Calculate the previous index after swapping
    const previousIndex =
      index === firstElementSwap || index === secondElementSwap
        ? index === firstElementSwap
          ? secondElementSwap
          : firstElementSwap
        : index;

    let isSorted = false;
    isSorted = i === numSteps - 1;

    return {
      value,
      index,
      previousIndex,
      isSorted,
      isSwapped: index === bubbleElement[i - 1] || index - 1 === bubbleElement[i - 1],
    };
  });
};
