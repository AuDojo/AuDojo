// MergeSortGuide.tsx
import { useSortContext } from "../../../hooks/sortContextHooks";
import styles from "../../../styles/sortSensei/MergeSortGuide.module.css";

export const SelectionSortGuide: React.FC = () => {
  const { step, mergeRanges } = useSortContext();

  const getCurrentGuideText = () => {
    const currentRange = mergeRanges[step - 1];
    if (!currentRange || currentRange[0] === -1) {
      return "Starting Selection Sort! ";
    }

    const [start, end] = currentRange;
    const length = end - start + 1;

    if (length === 1) {
      return "An array of length 1 is already sorted.";
    } else if (length === 2) {
      return "...";
    } else {
      if (step === 1) {
        return "....";
      }
      // Add more specific messages based on the current state
      return `... `;
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
