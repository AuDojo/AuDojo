import { useSortContext } from "@/features/sortSensei/context/SortContext";
import classNames from "classnames/bind";
import ListCell from "../tableCell/ListCell";
import styles from "./TableRow.module.css";

// Bind styles to classNames
const cx = classNames.bind(styles);

const ListRow = () => {
  const { processList } = useSortContext();

  return (
    <div className={cx("start-row-container")}>
      <span className={cx("list-index")}>List</span>
      {processList[0].map((_, index) => (
        <ListCell key={index} columnIndex={index} />
      ))}
    </div>
  );
};

export default ListRow;
