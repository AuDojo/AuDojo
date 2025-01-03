import { useSortContext } from "@hooks/index";
import classNames from "classnames/bind";
import TableCell from "../tableCell/TableCell";
import styles from "./TableRow.module.css";

// Bind styles to classNames
const cx = classNames.bind(styles);

const ListRow = () => {
  const { stepsList } = useSortContext();

  return (
    <div className={cx("start-row-container")}>
      <span className={cx("list-index")}>List</span>
      {stepsList[0].map((_, index) => (
        <TableCell rowIndex={0} columnIndex={index} key={index} />
      ))}
    </div>
  );
};

export default ListRow;
