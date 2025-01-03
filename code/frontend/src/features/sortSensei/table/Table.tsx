import { useTutorialModalContext } from "@features/sortSensei/hooks/";
import { useSortContext } from "@hooks/index";
import { JSX } from "react";
import { IndexRow, InputRow, ListRow } from ".";
import styles from "./Table.module.css";
/**
 * A table component that displays a list of steps for the given sorting
 * algorithm. Each step is represented by a TableRow component.
 *
 * @return {JSX.Element} A table component with a TableRow for each step of the
 *  given sorting algorithm
 */
const SortingTable = (): JSX.Element => {
  const { stepsList } = useSortContext();
  const { refs } = useTutorialModalContext();

  // If stepsList is empty, just return null
  if (!stepsList || stepsList.length === 0) {
    return <div>Loading...</div>;
  }

  // Set row height (2.5rem) and calc max height
  const rowHeight = 2.5;
  const maxHeight = `${(stepsList.length + 1) * rowHeight}rem`;

  return (
    <div ref={refs.sortingTable} style={{ backgroundColor: "white" }}>
      <ListRow />
      <div className={styles["table-container"]} style={{ maxHeight }}>
        <table>
          {/* <caption>Iterations</captaon> */}
          <tbody>
            <IndexRow />
            {stepsList.slice(1).map((_, index) => (
              <InputRow key={index + 1} rowIndex={index + 1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SortingTable;
