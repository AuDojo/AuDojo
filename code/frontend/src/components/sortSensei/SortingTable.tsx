import { useSortContext } from "../../hooks/sortContextHooks";
import styles from "../../styles/sortSensei/SortingTable.module.css";
import TableRow from "./TableRow";

interface TableProps {
  sortType: string;
}

/**
 * A table component that display a list of steps for the given sorting
 * algorithm. Each step is represented by a TableRow component.
 *
 * @param {string} sortType - The name of the sorting algorithm to display.
 * @return {JSX.Element} A table component with a TableRow for each step of the
 *  given sorting algorithm
 */
const SortingTable = ({ sortType }: TableProps) => {
  const { stepsList } = useSortContext();
  return (
    <div className={styles["table-container"]}>
      {stepsList.map((stepList, index) => (
        <TableRow
          key={index}
          stepList={stepList}
          rowIndex={index}
          sortType={sortType}
        />
      ))}
    </div>
  );
};

export default SortingTable;
