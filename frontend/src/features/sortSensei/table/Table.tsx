import { useSortContext } from "@/features/sortSensei/context/SortContext";
import { useTutorialModalContext } from "@features/sortSensei/context";
import { JSX } from "react";
import { IndexRow, InputRow, ListRow } from ".";
import { Points } from "./points";
import styles from "./Table.module.css";
/**
 * A table component that displays a list of steps for the given sorting
 * algorithm. Each step is represented by a TableRow component.
 *
 * @return {JSX.Element} A table component with a TableRow for each step of the
 *  given sorting algorithm
 */
const SortingTable = (): JSX.Element => {
  const { processList } = useSortContext();
  const { highlightRefs } = useTutorialModalContext();

  // If processList is empty, just return null
  if (!processList || processList.length === 0) {
    return <div>Loading...</div>;
  }

  // Set row height (2.5rem) and calc max height
  const rowHeight = 2.5;
  const maxHeight = `${(processList.length + 1) * rowHeight}rem`;

  return (
    <div ref={highlightRefs.sortingTable} style={{ backgroundColor: "white" }}>
      <ListRow />
      <div className={styles["table-container"]} style={{ maxHeight }}>
        <table>
          {/* <caption>Iterations</captaon> */}
          <tbody>
            <IndexRow />
            {processList.slice(1).map((_, index) => (
              <InputRow key={index + 1} rowIndex={index + 1} />
            ))}
          </tbody>
        </table>
      </div>
      <Points />
    </div>
  );
};

export default SortingTable;
