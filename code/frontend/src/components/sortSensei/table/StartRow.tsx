import { MAX_INPUT_RANGE, MIN_INPUT_RANGE } from "@constants/index";
import { useSortContext } from "@hooks/index";
import styles from "@styles/sortSensei/SortingTable.module.css";
import classNames from "classnames/bind";

// Bind styles to classNames
const cx = classNames.bind(styles);

const StartRow = () => {
  const { stepsList, inputCellsRef, inputCellValues, setInputCellValues } =
    useSortContext();

  const stepList = stepsList[0];
  /**
   * Updates the state of the input values in the row when a user types in a new value.
   * Checks if the input value is either empty or a valid number (less than or equal to 40)
   * and only updates the state if the input passes this check.
   * @param value The new value of the input
   * @param index The index of the input in the row
   */
  const handleChange = (value: string, index: number): void => {
    // Check if the input value is either empty or a valid number
    if (
      (Number(value) >= MIN_INPUT_RANGE && Number(value) <= MAX_INPUT_RANGE) ||
      value === ""
    ) {
      const updatedValues = [...inputCellValues];
      updatedValues[0][index] = value; // Update the specific index with new value
      setInputCellValues(updatedValues); // Update the state
    }
  };

  /**
   * Focuses the input element at the given row and column index. This is used
   * to focus the cell after pressing the Enter key to go to the next cell.
   * @param rowIndex The index of the row
   * @param columnIndex The index of the column
   */
  const focusCell = (rowIndex: number, columnIndex: number): void => {
    const inputElement = inputCellsRef.current[rowIndex]?.[columnIndex];
    if (inputElement) {
      inputCellsRef.current[rowIndex][columnIndex].focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    columnIndex: number
  ): void => {
    const { key, shiftKey } = event;
    if ((key === "Enter" && shiftKey) || key === "ArrowLeft") {
      // Move to the previous field
      if (columnIndex === 0) {
        focusCell(0 - 1, stepList.length - 1);
      } else {
        focusCell(0, columnIndex - 1);
      }
    } else if ((key === "Enter" && !shiftKey) || key === "ArrowRight") {
      // Move to the next input field
      if (columnIndex === stepList.length - 1) {
        focusCell(0 + 1, 0);
      } else {
        focusCell(0, columnIndex + 1);
      }
    } else if (key === "ArrowDown") {
      // Move down
      focusCell(0 + 1, columnIndex);
    } else if (key === "ArrowUp") {
      // Move up
      focusCell(0 - 1, columnIndex);
    } else if (key === "Escape") {
      // Unfocus the input field
      (event.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className={cx("start-row-container")}>
      <span className={cx("list-index")}>List</span>
      {stepsList[0].map((_, index) => (
        <div key={index}>
          <input
            key={index}
            className={cx("cell-input")}
            value={inputCellValues[0][index]}
            readOnly={true}
            ref={(el) => {
              // Assign the input element to the appropriate cell in the ref
              if (inputCellsRef.current[0]) {
                inputCellsRef.current[0][index] = el!;
              }
            }}
            onChange={
              (event) => handleChange(event.target.value, index) // Update value
            }
            onKeyDown={(event) => handleKeyDown(event, index)}
          />
        </div>
      ))}
    </div>
  );
};

export default StartRow;
