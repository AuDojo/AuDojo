import { QuickSortBarData, QuickSortProps } from "../types";

export const createQuickSortData = ({
  currentArray,
  previousArray,
  numSteps,
  i,
  pivotElement,
}: QuickSortProps): QuickSortBarData[] => {
  return currentArray.map((value, index) => {
    // count occurrences of value
    const occurrenceCount = currentArray.slice(0, index).filter((v) => v === value).length;

    // Find position in previous array
    const previousIndex = previousArray.findIndex((v, i) => {
      const prevOccurrences = previousArray.slice(0, i).filter((v2) => v2 === value).length;
      return v === value && prevOccurrences === occurrenceCount;
    });
    const isPivot = i < numSteps - 1 ? index === pivotElement[i + 1][0] : false;
    const isSorted = i >= 1 ? index === pivotElement[i][1] : false;

    return {
      value,
      index,
      previousIndex,
      isPivot: isPivot,
      isSorted: isSorted || i === numSteps - 1,
    };
  });
};
