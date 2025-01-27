import { SelectionSortBarData, SelectionSortProps } from "../types";

/**
 * Transforms the current state of the array during the Selection Sort process into an array of SelectionSortBarData objects.
 *
 * @param {number[]} props.currentArray - The current state of the array being sorted.
 * @param {number} props.numSteps - The total number of steps in the sorting process.
 * @param {number} props.i - The current step index.
 * @param {number[]} props.selectionElements - The indices of the elements that have been selected as the minimum in each step.
 *
 * @returns {SelectionSortBarData[]} An array of SelectionSortBarData objects containing the value, current index, previous index,
 * whether the element is selected, whether the element is sorted, and whether the element is unsorted.
 */
export const createSelectionSortData = ({
  currentArray,
  numSteps,
  i,
  selectionElements,
}: SelectionSortProps): SelectionSortBarData[] => {
  return currentArray.map((value, index) => {
    // Identify the last unsorted element and the last selected minimum element
    const lastLeftElement = i - 1;
    const lastSelectedElement = i >= 1 ? selectionElements[i - 1] : -1;

    // Determine the previous index by checking if the current index matches any key elements
    const previousIndex =
      i >= 1 && (index === lastLeftElement || index === lastSelectedElement)
        ? index === lastLeftElement
          ? lastSelectedElement
          : lastLeftElement
        : index;

    // Check if the last index is the leftmost unsorted element
    const isLeftUnsorted = previousIndex === i - 1 && i - 1 !== numSteps - 1;

    // Check if the last index is the selected minimum element
    const isSelected = selectionElements[i - 1] === previousIndex;

    // Determine if the element is sorted
    const isSorted = i === numSteps - 1 || index < i;
    const isCurrentSorted = index === i - 1; // avoid animation conflict

    return {
      value,
      index,
      previousIndex,
      isLeftUnsorted,
      isSelected,
      isSorted,
      isCurrentSorted,
    };
  });
};
