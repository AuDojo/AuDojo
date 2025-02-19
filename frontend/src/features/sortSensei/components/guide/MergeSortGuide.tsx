// MergeSortGuide.tsx
import { useSortContext } from "@/features/sortSensei/context/SortContext";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import styles from "./SortGuide.module.css";
const MergeSortGuide = () => {
  const { step, mergeRanges, processList } = useSortContext();
  const { t } = useTranslation("sortsensei");
  const getCurrentGuideText = () => {
    const currentRange = mergeRanges[step - 1];
    if (!processList || processList.length === 0) {
      return "Starting Merge Sort!";
    }
    if (!currentRange || currentRange[0] === -1 || step === 1) {
      return <>{parse(t("mergeSort.guide.splitting"))}</>;
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
    } else if (length === processList.length) {
      return "Sorting is complete!";
    } else {
      if (step === 1) {
        return "Split the array into two halves.";
      }
      return <>{parse(t("mergeSort.guide.merge"))}</>;
    }
  };

  return (
    <div className={styles["guide"]}>
      <h3>{t("mergeSort.guide.heading")}</h3>
      <div className={styles["step"]}>
        <p>{getCurrentGuideText()}</p>
      </div>
    </div>
  );
};

export default MergeSortGuide;
