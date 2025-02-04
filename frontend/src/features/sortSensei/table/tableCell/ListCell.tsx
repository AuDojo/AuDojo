import { useTableCell } from "@features/sortSensei/table/hooks";
import classNames from "classnames/bind";
import { JSX } from "react";
import { useTableContext } from "../context/TableContext";
import styles from "./TableCell.module.css";
import { useSortContext } from "@/features/sortSensei/context";
import { SortTypes } from "@/features/sortSensei/constants";
import Separator from "./cellSeparator/Separator";

interface ListCellProps {
  columnIndex: number;
  isMarked: boolean;
  setIsMarked: (isMarked: boolean) => void;
}

// Bind styles to classNames
const cx = classNames.bind(styles);

const ListCell = ({ columnIndex, isMarked, setIsMarked }: ListCellProps): JSX.Element => {
  const { sortTypeRef } = useSortContext();
  const { inputCellValues, inputCellsRef } = useTableContext();
  const { handleCellKeyDown } = useTableCell();
  const cellValue = inputCellValues[0]?.[columnIndex] || "";
  return (
    <>
      <input
        className={cx("cell-input")}
        value={cellValue}
        readOnly={true}
        ref={(el) => {
          if (inputCellsRef.current[0]) {
            inputCellsRef.current[0][columnIndex] = el;
          }
        }}
        onKeyDown={(event) => handleCellKeyDown(event, 0, columnIndex)}
      />
      {sortTypeRef.current === SortTypes.MergeSort && columnIndex != inputCellValues[0].length - 1 && (
        <Separator isMarked={isMarked} setIsMarked={setIsMarked} />
      )}
    </>
  );
};

export default ListCell;
