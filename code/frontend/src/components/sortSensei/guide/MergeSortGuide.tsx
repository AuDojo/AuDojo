// MergeSortGuide.tsx
import { useSortContext } from "../../../hooks/sortContextHooks";
import styles from "../../../styles/sortSensei/MergeSortGuide.module.css";

export const MergeSortGuide: React.FC = () => {
  const { step, mergeRanges, stepsList } = useSortContext();

  const getCurrentGuideText = () => {
    const currentRange = mergeRanges[step - 1];
    if (!currentRange || currentRange[0] === -1) {
      return "Starting Merge Sort! \nSplit array into two halves.";
    }

    const [start, end] = currentRange;
    const length = end - start + 1;

    if (length === 1) {
      return "An array of length 1 is already sorted.";
    } else if (length === 2) {
      return "Compare and merge two elements in sorted order.";
    } else if (length === stepsList.length) {
      return "Sorting is complete.";
    } else {
      if (step === 1) {
        return "Split the array into two halves.";
      }
      // Add more specific messages based on the current state
      return `Merging ... `;
    }
  };

  return (
    <div className={styles["guide"]}>
      <h3>Merge Sort Guide</h3>
      <div className={styles["step"]}>
        <p>{getCurrentGuideText()}</p>
      </div>
    </div>
  );
};
