import { SortTypes } from "@/features/sortSensei/constants";
import { useSortContext } from "@/features/sortSensei/context";
import { mergeRefs } from "@/utils/mergeRefs";
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
  const { tableCellsRef } = useTableContext();
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
              //TODO: Remove the next line later, when react-compiler doesnt complain about assigning a value to a ref from a context
              // eslint-disable-next-line react-compiler/react-compiler
              tableCellsRef.current[0][columnIndex] = el;
            }
          },
          ...hotkeyRefs
        )}
        aria-label={`Array[${columnIndex}]: ${cellValue}`}
      />
      {sortTypeRef.current === SortTypes.MergeSort && columnIndex != sharedArray.length - 1 && (
        <Separator isMarked={isMarked} setIsMarked={setIsMarked} />
      )}
    </>
  );
};

export default ListCell;
