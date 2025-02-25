import { SortTypes } from "@/features/sortSensei/constants";
import { useSortContext } from "@/features/sortSensei/context/SortContext";
import { mergeRefs } from "@/utils/mergeRefs";
import { updateValue } from "@/utils/updateValue";
import classNames from "classnames/bind";
import { JSX } from "react";
import { useTableContext } from "../context/TableContext";
import { useCellChange, useCellHotkeys } from "./hooks";
import { useCellData } from "./hooks/useCellData";
import styles from "./TableCell.module.css";

interface TableCellProps {
  rowIndex: number;
  columnIndex: number;
}

// Bind styles to classNames
const cx = classNames.bind(styles);

const InputCell = ({ rowIndex, columnIndex }: TableCellProps): JSX.Element => {
  const { step, bubbleElements } = useSortContext();
  const { tableCellsRef } = useTableContext();

  const { handleCellChange } = useCellChange();
  const hotkeyRefs = useCellHotkeys(rowIndex, columnIndex);
  const data = useCellData(rowIndex, columnIndex);

  // Tooltip content for incorrect input
  const tooltipContent = data.inputCellValue ? `Your input: ${data.inputCellValue}` : "Missing input";

  return (
    <td
      {...(data.validation === false ? { "aria-label": tooltipContent, "data-tooltip": "top 200" } /* Tooltip */ : {})}
    >
      <input
        className={cx("cell-input", {
          // Cell Validation styles
          correct: data.validation === true,
          incorrect: data.validation === false,
          "pivot-cell": data.isPivot && rowIndex < step,

          // MergeSort styles
          "in-merge-range": data.sortType === SortTypes.MergeSort && data.isInmergeRanges && rowIndex < step,
          "merge-range-start":
            data.sortType === SortTypes.MergeSort && columnIndex === data.mergeRanges[0] && rowIndex < step,
          "merge-range-end":
            data.sortType === SortTypes.MergeSort && columnIndex === data.mergeRanges[1] && rowIndex < step,

          // SelectionSort styles
          "selected-cell": data.isSelected,

          // BubbleSort styles
          "bubble-cell-first":
            data.sortType === SortTypes.BubbleSort && columnIndex === bubbleElements[rowIndex - 1] && rowIndex < step,
          "bubble-cell-second":
            data.sortType === SortTypes.BubbleSort &&
            columnIndex === bubbleElements[rowIndex - 1] + 1 &&
            rowIndex < step,
        })}
        value={rowIndex < step ? data.value || "" : data.inputCellValue}
        readOnly={rowIndex < step}
        ref={mergeRefs(
          (el) => {
            if (tableCellsRef.current[rowIndex]) {
              updateValue(tableCellsRef.current[rowIndex][columnIndex], el);
            }
          },
          ...hotkeyRefs
        )}
        onChange={(event) => rowIndex >= step && handleCellChange(event.target.value, rowIndex, columnIndex)}
        placeholder={rowIndex === 1 && columnIndex === 0 ? "Edit" : ""}
      />
    </td>
  );
};

export default InputCell;
