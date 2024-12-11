// MergeSortGuide.tsx
import { useSortContext } from "@hooks/index";
import styles from "@styles/sortSensei/MergeSortGuide.module.css";

const MergeSortGuide: React.FC = () => {
  const { step, mergeRanges, stepsList } = useSortContext();

  const getCurrentGuideText = () => {
    const currentRange = mergeRanges[step - 1];
    if (!currentRange || currentRange[0] === -1 || step === 1) {
      return <>Split array into two subarrays and split subarrays into halves untils they are of length 1.</>;
    }

    const [start, end] = currentRange;
    const length = end - start + 1;

    if (length === 1) {
      return "An array of length 1 is already sorted.";
    } else if (length === 2) {
      return <>Compare and sort two elements. <br/> <b>Table: Mark the sorted elements.</b></>;
    } else if (length === stepsList.length) {
      return "Sorting is complete.";
    } else {

      // Add more specific messages based on the current state
      return <>Two subarrays are sorted. Merge them in sorted order. <br/> <b>Table: Mark the merged array</b></>;
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

export default MergeSortGuide;
