import { useSortContext } from "@hooks/index";
import classNames from "classnames/bind";
import ListCell from "../tableCell/ListCell";
import styles from "./TableRow.module.css";

// Bind styles to classNames
const cx = classNames.bind(styles);

const ListRow = () => {
  const { stepsList } = useSortContext();

  return (
    <div className={cx("start-row-container")}>
      <span className={cx("list-index")}>List</span>
      {stepsList[0].map((_, index) => (
        <ListCell key={index} columnIndex={index} />
      ))}
    </div>
  );
};

export default ListRow;
