import { useSortContext } from "../../contexts/SortContext";
import styles from "../../styles/sortSensei/SortingTable.module.css";
import TableRow from "./TableRow";

const SortingTable = () => {
  const { stepsList } = useSortContext();
  return (
    <div className={styles["table-container"]}>
      {stepsList.map((stepList, index) => (
        <TableRow key={index} stepList={stepList} index={index} />
      ))}
    </div>
  );
};

export default SortingTable;
