import classNames from "classnames/bind";
import { useSortContext } from "../../../hooks/sortContextHooks";
import styles from "../../../styles/sortSensei/SortingTable.module.css";

// Bind styles to classNames
const cx = classNames.bind(styles);

const IndexRow = () => {
  const { stepsList } = useSortContext();
  return (
    <tr className={cx("index-row-container")}>
      <th className={cx("index-row-index")}></th>
      {stepsList[0].map((_, index) => (
        <td className={cx("column-index")}>{index}</td>
      ))}
    </tr>
  );
};

export default IndexRow;
