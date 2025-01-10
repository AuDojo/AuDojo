import { MergeSortBarData, MergeSortProps } from "../types";

export const createMergeSortData = ({
  currentArray,
  previousArray,
  numSteps,
  i,
  mergeRanges,
}: MergeSortProps): MergeSortBarData[] => {
  return currentArray.map((value, index) => {
    // count occurrences of value
    const occurrenceCount = currentArray.slice(0, index).filter((v) => v === value).length;

    // Find position in previous array
    const previousIndex = previousArray.findIndex((v, i) => {
      const prevOccurrences = previousArray.slice(0, i).filter((v2) => v2 === value).length;
      return v === value && prevOccurrences === occurrenceCount;
    });

    return {
      value,
      index,
      previousIndex,
      isSorted: i === numSteps - 1,
      isMerged: mergeRanges[i] && index >= mergeRanges[i][0] && index <= mergeRanges[i][1],
    };
  });
};

export default createMergeSortData;
