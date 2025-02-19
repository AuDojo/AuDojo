import { useTableContext } from "@/features/sortSensei/components/table/context/TableContext";
import { MAX_INPUT_RANGE, MIN_INPUT_RANGE } from "@/features/sortSensei/constants";

export const useCellChange = () => {
  const { userInputTable, setUserInputTable } = useTableContext();

  /**
   * Updates the state of the input values in the row when a user types in a new value.
   * Checks if the input value is either empty or a valid number (less than or equal to 40)
   * and only updates the state if the input passes this check.
   * @param value The new value of the input
   * @param columnIndex The index of the input in the row
   */
  const handleCellChange = (value: string, rowIndex: number, columnIndex: number): void => {
    // Check if input is too long
    if (value.length > 2) return;

    // Check if the input value is either empty or a valid number
    if ((Number(value) >= MIN_INPUT_RANGE && Number(value) <= MAX_INPUT_RANGE) || value === "") {
      const updatedValues = [...userInputTable];
      updatedValues[rowIndex][columnIndex] = value; // Update the specific index with new value
      setUserInputTable(updatedValues); // Update the state
    }
  };

  return { handleCellChange };
};
