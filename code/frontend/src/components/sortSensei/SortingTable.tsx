import { useSortContext } from "../../hooks/sortContextHooks";
import styles from "../../styles/sortSensei/SortingTable.module.css";
import TableRow from "./TableRow";

/**
 * A table component that displays a list of steps for the given sorting
 * algorithm. Each step is represented by a TableRow component.
 *
 * @return {JSX.Element} A table component with a TableRow for each step of the
 *  given sorting algorithm
 */
const SortingTable = () => {
  const { stepsList } = useSortContext();
  return (
    <div className={styles["table-container"]}>
      {stepsList.map((_, index) => (
        <TableRow key={index} rowIndex={index} />
      ))}
    </div>
  );
};

export default SortingTable;
