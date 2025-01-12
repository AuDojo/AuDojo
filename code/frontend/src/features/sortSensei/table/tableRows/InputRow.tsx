import { useSortContext } from "@/hooks";
import classNames from "classnames/bind";
import { InputCell } from "../tableCell";
import styles from "./TableRow.module.css";

interface RowProps {
  rowIndex: number;
}

// Bind styles to classNames
const cx = classNames.bind(styles);

/**
 * A component to render a single row of the sorting table.
 * @param rowIndex The index of the row
 */
const InputRow = ({ rowIndex }: RowProps) => {
  // Access the context values
  const { stepsList } = useSortContext();

  return (
    <tr className={cx("row-container")} key={rowIndex}>
      <th className={cx("row-index")}>{rowIndex}</th>
      {stepsList[rowIndex].map((_, columnIndex) => (
        <InputCell rowIndex={rowIndex} columnIndex={columnIndex} key={columnIndex} />
      ))}
    </tr>
  );
};

export default InputRow;
