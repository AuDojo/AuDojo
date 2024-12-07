import { useSortContext } from "@hooks/index";
import { useTableUtils } from "@src/hooks/useTableUtils";
import styles from "@styles/sortSensei/SortingTable.module.css";
import classNames from "classnames/bind";

// Bind styles to classNames
const cx = classNames.bind(styles);

const StartRow = () => {
  const { stepsList, inputCellsRef, inputCellValues } = useSortContext();
  const { handleCellChange, handleCellKeyDown } = useTableUtils();

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
              (event) => handleCellChange(event.target.value, 0, index) // Update value
            }
            onKeyDown={(event) => handleCellKeyDown(event, 0, index)}
          />
        </div>
      ))}
    </div>
  );
};

export default StartRow;
