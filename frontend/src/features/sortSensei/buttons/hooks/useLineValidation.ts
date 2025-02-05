import { useSortContext } from "@features/sortSensei/context/SortContext";
import { useTableContext } from "@features/sortSensei/table/context";
import { SortTypes } from "@/features/sortSensei/constants";

export const useLineValidation = () => {
  const { processList, mergeRanges, sortTypeRef, selectionElements, bubbleElements } = useSortContext();
  const { userInputTable: inputCellValues } = useTableContext();

  /* Check if cell is in merge range*/
  const isValueInMergeRange = (currentStep: number, currentColumn: number): boolean => {
    const currentMergeRanges = mergeRanges?.[currentStep] ?? [-1, -1];
    return currentMergeRanges && currentColumn >= currentMergeRanges[0] && currentColumn <= currentMergeRanges[1];
  };
  const isValueSelected = (currentStep: number, currentColumn: number): boolean => {
    return (
      selectionElements.length >= currentStep &&
      (currentColumn === selectionElements[currentStep - 1] || currentColumn === currentStep - 1)
    );
  };
  const isValueBubbleElement = (currentStep: number, currentColumn: number): boolean => {
    return bubbleElements[currentStep - 1] === currentColumn || bubbleElements[currentStep - 1] + 1 === currentColumn;
  };

  /**
   * Validates the user's input values against the correct step values for a given sorting step.
   * Checks the current step's user input values against the expected values and updates the
   * cell validation state. It accounts for merge ranges in the case of MergeSort.
   *
   * @param {number} currentStep - The index of the current step in the sorting process.
   * @returns {boolean[]} An array of boolean values indicating whether each input value is correct or not.
   */
  const validateLine = (currentStep: number): boolean[] => {
    if (currentStep >= processList.length) return [];
    const correctValues = processList[currentStep];
    const userValues = inputCellValues[currentStep];
    const sortType = sortTypeRef.current;

    const validationResult = userValues.map((value, currentColumn): boolean => {
      const isInMergeRange = isValueInMergeRange(currentStep, currentColumn);
      const isSelected = isValueSelected(currentStep, currentColumn);
      const isBubbleElement = isValueBubbleElement(currentStep, currentColumn);
      const noValidationNeeded =
        (sortType === SortTypes.SelectionSort && !isSelected) ||
        (sortType === SortTypes.MergeSort && !isInMergeRange) ||
        (sortType === SortTypes.BubbleSort && !isBubbleElement);
      if (noValidationNeeded) {
        // Skip validation for unselected / unmerged cells
        return value === "" || Number(value) === correctValues[currentColumn];
      } else {
        // check if user input is correct
        return Number(value) === correctValues[currentColumn];
      }
    });

    return validationResult;
  };

  return { validateLine };
};
