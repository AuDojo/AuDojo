import { useState } from "react";
import { useSortContext } from "../../hooks/sortContextHooks";
import styles from "../../styles/sortSensei/SortingTable.module.css";

interface RowProps {
  stepList: number[];
  index: number;
}

const TableRow = ({ stepList: stepList, index }: RowProps) => {
  // Access the context values
  const { step } = useSortContext();
  // State to hold the values for editable cells, initialize with empty strings for non-zero indexes
  const [inputValues, setInputValues] = useState<string[]>(
    index < step ? stepList.map(String) : Array(stepList.length).fill("")
  );

  // Handle change for editable inputs
  const handleChange = (value: string, i: number) => {
    // Check if the input value is either empty or a valid number
    if (Number(value) || value === "") {
      const updatedValues = [...inputValues];
      updatedValues[i] = value; // Update the specific index with new value
      setInputValues(updatedValues); // Update the state
    }
  };

  return (
    <div className={styles["row-container"]}>
      <span className={styles["row-index"]}>{index}</span>
      {stepList.map((num, i) => (
        <input
          key={i}
          className={styles["cell-input"]}
          value={index < step ? num : inputValues[i]} // Show number for index 0, or value from state otherwise
          readOnly={index < step} // Make read-only if index is 0
          onChange={(event) => {
            if (index >= step) {
              handleChange(event.target.value, i); // Update value if index is not 0
            }
          }}
        />
      ))}
    </div>
  );
};

export default TableRow;
