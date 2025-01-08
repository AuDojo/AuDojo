import { useSortContext } from "@/hooks";
import { useTableUtils } from "@features/sortSensei/table/hooks";
import classNames from "classnames/bind";
import { JSX } from "react";
import styles from "./TableCell.module.css";

interface ListCellProps {
  columnIndex: number;
}

// Bind styles to classNames
const cx = classNames.bind(styles);

const ListCell = ({ columnIndex }: ListCellProps): JSX.Element => {
  const { inputCellValues, inputCellsRef } = useSortContext();

  const { handleCellKeyDown } = useTableUtils();

  const cellValue = inputCellValues[0][columnIndex];
  return (
    <input
      className={cx("cell-input")}
      value={cellValue}
      readOnly={true}
      ref={(el) => {
        if (inputCellsRef.current[0]) {
          inputCellsRef.current[0][columnIndex] = el!;
        }
      }}
      onKeyDown={(event) => handleCellKeyDown(event, 0, columnIndex)}
    />
  );
};

export default ListCell;
