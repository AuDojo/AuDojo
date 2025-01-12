// MergeSortGuide.tsx
import { useSortContext } from "@/features/sortSensei/context/SortContext";
import styles from "./SortGuide.module.css";

const SelectionSortGuide = () => {
  const { step, processList, selectionElements } = useSortContext();

  const getCurrentGuideText = () => {
    if (!processList || processList.length === 0) {
      return "Starting Selection Sort!";
    }

    const currentArray = processList[step - 1];
    const prevArray = step > 1 ? processList[step - 2] : currentArray;
    const smallestElement = prevArray[selectionElements[step - 2]];
    const currentElement = prevArray[step - 2];
    if (step === 1) {
      return (
        <>
          Starts with the current element at <b>index 0</b>.<br />
          Find the smallest from the remaining elements.
          <br />
        </>
      );
    } else if (step >= 2) {
      if (step === processList.length) {
        return <>Sorting is complete!</>;
      }

      return (
        <>
          Swap <b>current ({currentElement})</b> with <b>smallest ({smallestElement})</b>. <br />
          Move to <b>index {step - 1}</b> and find the smallest in the unsorted subarray.
          <br />
        </>
      );
    }
  };

  return (
    <div className={styles.guide}>
      <h3>Selection Sort Guide</h3>
      <div className={styles.step}>
        <p>{getCurrentGuideText()}</p>
      </div>
    </div>
  );
};

export default SelectionSortGuide;
