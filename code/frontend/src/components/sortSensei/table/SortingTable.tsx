import { useSortContext } from "../../../hooks/sortContextHooks";
import styles from "../../../styles/sortSensei/SortingTable.module.css";
import StartRow from "./StartRow";
import TableRow from "./TableRow";

/**
 * A table component that displays a list of steps for the given sorting
 * algorithm. Each step is represented by a TableRow component.
 *
 * @return {JSX.Element} A table component with a TableRow for each step of the
 *  given sorting algorithm
 */
const SortingTable = (): JSX.Element => {
  const { stepsList } = useSortContext();

  // If stepsList is empty, just return null
  if (!stepsList || stepsList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <StartRow />
      <div className={styles["table-container"]}>
        {stepsList.slice(1).map((_, index) => (
          <TableRow key={index + 1} rowIndex={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default SortingTable;
