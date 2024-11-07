import { useSortContext } from "../../hooks/sortContextHooks";
import styles from "../../styles/sortSensei/SortingTable.module.css";
import TableRow from "./TableRow";

interface TableProps {
  sortType: string;
}

const SortingTable = ({ sortType }: TableProps) => {
  const { stepsList } = useSortContext();
  return (
    <div className={styles["table-container"]}>
      {stepsList.map((stepList, index) => (
        <TableRow
          key={index}
          stepList={stepList}
          index={index}
          sortType={sortType}
        />
      ))}
    </div>
  );
};

export default SortingTable;
