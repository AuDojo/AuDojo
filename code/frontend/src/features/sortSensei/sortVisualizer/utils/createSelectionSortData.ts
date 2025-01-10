import { SelectionSortBarData, SelectionSortProps } from "../types";

export const createSelectionSortData = ({
  currentArray,
  numSteps,
  i,
  selectionElement,
}: SelectionSortProps): SelectionSortBarData[] => {
  return currentArray.map((value, index) => {
    const lastLeftElement = i - 1;
    const lastSelectedElement = i >= 1 ? selectionElement[i - 1] : -1;
    const previousIndex =
      i >= 1 && (index === lastLeftElement || index === lastSelectedElement)
        ? index === lastLeftElement
          ? lastSelectedElement
          : lastLeftElement
        : index;
    return {
      value,
      index,
      previousIndex,
      isLeftUnsorted: index === i && i !== numSteps - 1,
      isSelected: selectionElement[i] === index,
      isSorted: i === numSteps - 1 || index < i,
    };
  });
};
