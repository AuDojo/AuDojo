// MergeSortGuide.tsx
import { useSortContext } from "@hooks/index";
import styles from "@styles/sortSensei/SortGuide.module.css";

const QuickSortGuide = () => {
  const { step, stepsList, pivotElement } = useSortContext();

  const getCurrentGuideText = () => {
    if (!stepsList || stepsList.length === 0) {
      return "Starting Quick Sort!";
    }
    if (step === 1) {
      return (
        <>
          Choose <b>last element "{stepsList[0][stepsList[0].length - 1]}"</b> as pivot element.
        </>
      );
    } else if (step >= 2) {
      const prevArray = stepsList[step - 2];
      const pivot = prevArray[pivotElement[step - 1][0]];
      const currentArray = stepsList[step - 1];
      const nextPivot = step !== stepsList.length ? currentArray[pivotElement[step][0]] : 0;

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
