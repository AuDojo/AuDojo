import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useSortContext } from "../../hooks/sortContextHooks";
import styles from "../../styles/sortSensei/SortingTable.module.css";

interface RowProps {
  stepList: number[];
  index: number;
  sortType: string;
}

const TableRow = ({ stepList, index, sortType }: RowProps) => {
  // Access the context values
  const { step, mergeRanges } = useSortContext();
  const mergeRange = mergeRanges[index];
  // State to hold the values for editable cells, initialize with empty strings for non-zero indexes
  const [inputValues, setInputValues] = useState<string[]>(
    stepList.map(String)
  );

  useEffect(() => {
    // Sync inputValues with stepList whenever stepList changes
    setInputValues(stepList.map(String));
  }, [stepList]);

  // Create an array of refs for each input in the row
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    // Initialize refs array to match the number of inputs
    inputRefs.current = Array(stepList.length)
      .fill(null)
      .map((_, i) => inputRefs.current[i] || React.createRef());
  }, [stepList.length]);

  // Handle change for editable inputs
  const handleChange = (value: string, i: number) => {
    // Check if the input value is either empty or a valid number
    if (Number(value) <= 40 || value === "") {
      const updatedValues = [...inputValues];
      updatedValues[i] = value; // Update the specific index with new value
      setInputValues(updatedValues); // Update the state
    }
  };

  //TODO: Ugly DOM, use something with react, maybe ref
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    i: number
  ) => {
    if ((event.key === "Enter" && event.shiftKey) || event.key === "a") {
      // Move to previous input field
      const prevInput = document.querySelectorAll<HTMLInputElement>(
        `.${styles["cell-input"]}`
      )[index * stepList.length + i - 1];
      if (prevInput) prevInput.focus();
    } else if (
      (event.key === "Enter" && !event.shiftKey) ||
      event.key === "d"
    ) {
      // Move to the next input field
      const nextInput = document.querySelectorAll<HTMLInputElement>(
        `.${styles["cell-input"]}`
      )[index * stepList.length + i + 1];
      if (nextInput) nextInput.focus();
    } else if (event.key === "s" || event.key === "ArrowDown") {
      const lowerInput = document.querySelector<HTMLInputElement>(
        `.row${index + 1}col${i}`
      );
      if (lowerInput) lowerInput.focus();
    } else if (event.key === "w" || event.key === "ArrowUp") {
      const lowerInput = document.querySelector<HTMLInputElement>(
        `.row${index - 1}col${i}`
      );
      if (lowerInput) lowerInput.focus();
    } else if (event.key === "Escape") {
      // Unfocus the input field
      (event.target as HTMLInputElement).blur();
    }
  };

  const isInMergeRange = (i: number) => {
    return i >= mergeRange[0] && i <= mergeRange[1];
  };

  return (
    <div className={styles["row-container"]}>
      <span className={styles["row-index"]}>{index}</span>
      {stepList.map((num, i) => (
        <input
          key={i}
          className={classNames(
            styles["cell-input"],
            `row${index}col${i}`,
            `${
              sortType === "mergesort" &&
              isInMergeRange(i) &&
              index < step &&
              styles["in-merge-range"]
            }`
          )}
          value={index < step ? num : inputValues[i]} // Show number for index 0, or value from state otherwise
          readOnly={index < step} // Make read-only if index is 0
          onChange={
            (event) => index >= step && handleChange(event.target.value, i) // Update value if index is not 0
          }
          onKeyDown={(event) => handleKeyDown(event, i)}
        />
      ))}
    </div>
  );
};

export default TableRow;
