import { useSortContext } from "@/features/sortSensei/context/SortContext";
import styles from "./SortGuide.module.css";

const BubbleSortGuide = () => {
  const { step, processList, bubbleElements } = useSortContext();

  const getCurrentGuideText = () => {
    if (!processList.length) {
      return "Starting Bubble Sort!";
    }
    if (step === 1) {
      return (
        <>
          <b>Compare adjacents</b> elements and swap them if they are in the wrong order.
        </>
      );
    } else if (step >= 2) {
      const firstSwapElement = processList[step - 2][bubbleElements[step - 2]];
      const adjacentElement = processList[step - 2][bubbleElements[step - 2] + 1];
      const isElementSorted = bubbleElements[step - 2] > bubbleElements[step - 1];
      return (
        <>
          Swap <b>{firstSwapElement}</b> with <b>{adjacentElement}</b>
          <br />
          <br />
          {isElementSorted || step === processList.length ? (
            <>
              Now <b>{firstSwapElement}</b> stands at the <b>right place!</b>
              {step === processList.length ? (
                <b>
                  <br />
                  Sorting is complete!
                </b>
              ) : (
                ""
              )}
            </>
          ) : (
            <>(Bring {firstSwapElement} to the end of the array.)</>
          )}
        </>
      );
    }
  };

  return (
    <div className={styles.guide}>
      <h3>Bubble Sort Guide</h3>
      <div className={styles.step}>
        <p>{getCurrentGuideText()}</p>
      </div>
    </div>
  );
};

export default BubbleSortGuide;
