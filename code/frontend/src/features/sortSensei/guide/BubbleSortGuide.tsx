import { useSortContext } from "@/hooks";
import styles from "./SortGuide.module.css";

const BubbleSortGuide = () => {
  const { step, stepsList, bubbleElement } = useSortContext();

  const getCurrentGuideText = () => {
    if (!stepsList.length) {
      return "Starting Bubble Sort!";
    }
    if (step === 1) {
      return (
        <>
          <b>Compare adjacents</b> elements and swap them if they are in the wrong order.
        </>
      );
    } else if (step >= 2) {
      const firstSwapElement = stepsList[step - 2][bubbleElement[step - 2]];
      const adjacentElement = stepsList[step - 2][bubbleElement[step - 2] + 1];
      const isElementSorted = bubbleElement[step - 2] > bubbleElement[step - 1];
      return (
        <>
          Swap <b>{firstSwapElement}</b> with <b>{adjacentElement}</b>
          <br />
          <br />
          {isElementSorted || step === stepsList.length ? (
            <>
              Now <b>{firstSwapElement}</b> stands at the <b>right place!</b>
              {step === stepsList.length ? (
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
