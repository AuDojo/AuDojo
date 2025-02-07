import { SortTypes } from "@/features/sortSensei/constants";
import { useSortContext } from "@/features/sortSensei/context";
import { mergeRefs } from "@/lib/mergeRefs";
import classNames from "classnames/bind";
import { JSX } from "react";
import { useTableContext } from "../context/TableContext";
import Separator from "./cellSeparator/Separator";
import { useCellHotkeys } from "./hooks";
import styles from "./TableCell.module.css";

interface ListCellProps {
  columnIndex: number;
  isMarked: boolean;
  setIsMarked: (isMarked: boolean) => void;
}

// Bind styles to classNames
const cx = classNames.bind(styles);

const ListCell = ({ columnIndex, isMarked, setIsMarked }: ListCellProps): JSX.Element => {
  const { sortTypeRef, sharedArray } = useSortContext();
  const { tableCellsRef: tableCellsRef } = useTableContext();
  const hotkeyRefs = useCellHotkeys(0, columnIndex);
  const cellValue = sharedArray[columnIndex] || "";
  return (
    <>
      <input
        className={cx("cell-input")}
        value={cellValue}
        readOnly={true}
        ref={mergeRefs(
          (el) => {
            if (tableCellsRef.current[0]) {
              tableCellsRef.current[0][columnIndex] = el;
            }
          },
          ...hotkeyRefs
        )}
      />
      {sortTypeRef.current === SortTypes.MergeSort && columnIndex != sharedArray.length - 1 && (
        <Separator isMarked={isMarked} setIsMarked={setIsMarked} />
      )}
    </>
  );
};

export default ListCell;
