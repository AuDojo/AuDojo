// MergeSortGuide.tsx
import { useSortContext } from "@hooks/index";
import styles from "@styles/sortSensei/SortGuide.module.css";

const QuickSortGuide: React.FC = () => {
  const { step, stepsList, selectionElement } = useSortContext();

  const getCurrentGuideText = () => {
    if (!stepsList || stepsList.length === 0) {
      return "Starting Selection Sort!";
    }

    const currentArray = stepsList[step - 1];
    const prevArray = step > 1 ? stepsList[step - 2] : currentArray;
    const smallestElement = prevArray[selectionElement[step - 2]];
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
      if (step === stepsList.length) {
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
      <h3>Quick Sort Guide</h3>
      <div className={styles.step}>
        <p>{getCurrentGuideText()}</p>
      </div>
    </div>
  );
};

export default QuickSortGuide;
