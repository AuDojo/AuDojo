import { useSortContext } from "@hooks/index";
import styles from "@styles/sortSensei/SortingTable.module.css";
import classNames from "classnames/bind";

// Bind styles to classNames
const cx = classNames.bind(styles);

const IndexRow = () => {
  const { stepsList } = useSortContext();
  return (
    <tr className={cx("index-row-container")}>
      <th className={cx("index-row-index")}></th>
      {stepsList[0].map((_, index) => (
        <td key={index} className={cx("column-index")}>
          {index}
        </td>
      ))}
    </tr>
  );
};

export default IndexRow;
