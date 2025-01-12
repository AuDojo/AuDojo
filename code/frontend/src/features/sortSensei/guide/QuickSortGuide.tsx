// MergeSortGuide.tsx
import { useSortContext } from "@/features/sortSensei/context/SortContext";
import styles from "./SortGuide.module.css";

const QuickSortGuide = () => {
  const { step, processList, pivotElements } = useSortContext();

  const getCurrentGuideText = () => {
    if (!processList || processList.length === 0) {
      return "Starting Quick Sort!";
    }
    if (step === 1) {
      return (
        <>
          Choose <b>last element "{processList[0][processList[0].length - 1]}"</b> as pivot element.
        </>
      );
    } else if (step >= 2) {
      const prevArray = processList[step - 2];
      const pivot = prevArray[pivotElements[step - 1][0]];
      const currentArray = processList[step - 1];
      const nextPivot = step !== processList.length ? currentArray[pivotElements[step][0]] : 0;

      if (!nextPivot) {
        return (
          <>
            <b> The used pivot element "{pivot}" is marked</b>
            <br />
            Sorting is complete!
          </>
        );
      }

      return (
        <>
          After partitioning, all elements smaller than {pivot} are on its left, and larger on the right.
          <b> Choose "{nextPivot}"</b> as <b>next</b> pivot element.
          <br />
          <b> The used pivot element "{pivot}" is marked.</b>
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
