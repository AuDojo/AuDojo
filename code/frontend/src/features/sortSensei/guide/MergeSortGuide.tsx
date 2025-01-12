// MergeSortGuide.tsx
import { useSortContext } from "@/hooks";
import styles from "./SortGuide.module.css";

const MergeSortGuide = () => {
  const { step, mergeRanges, stepsList } = useSortContext();

  const getCurrentGuideText = () => {
    const currentRange = mergeRanges[step - 1];
    if (!stepsList || stepsList.length === 0) {
      return "Starting Merge Sort!";
    }
    if (!currentRange || currentRange[0] === -1 || step === 1) {
      return (
        <>
          <b>Split</b> the array into <b>two halves recursively</b> until each subarray contains one element.
        </>
      );
    }

    const [start, end] = currentRange;
    const length = end - start + 1;

    if (length === 1) {
      return "An array of length 1 is already sorted.";
    } else if (length === 2) {
      return (
        <>
          Compare and sort two elements. <br /> <b>The sorted elements are marked</b>
        </>
      );
    } else if (length === stepsList.length) {
      return "Sorting is complete!";
    } else {
      if (step === 1) {
        return "Split the array into two halves.";
      }
      return (
        <>
          Merge the sorted subarrays by comparing elements.
          <br /> <b>The merged array is marked.</b>
        </>
      );
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
