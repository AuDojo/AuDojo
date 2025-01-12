// MergeSortGuide.tsx
import { useSortContext } from "@hooks/index";
import styles from "./SortGuide.module.css";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";

const MergeSortGuide = () => {
  const { step, mergeRanges, stepsList } = useSortContext();

  const { t } = useTranslation("sortsensei");

  const getCurrentGuideText = () => {
    const currentRange = mergeRanges[step - 1];
    if (!stepsList || stepsList.length === 0) {
      return "Starting Merge Sort!"; // t("mergeSort.guide.start");
    }
    if (!currentRange || currentRange[0] === -1 || step === 1) {
      return <>{parse(t("mergeSort.guide.splitting"))}</>;
    }

    const [start, end] = currentRange;
    const length = end - start + 1;

    if (length === 1) {
      return "An array of length 1 is already sorted.";
    } else if (length === 2) {
      return <>{parse(t("mergeSort.guide.compare"))}</>;
    } else if (length === stepsList.length) {
      return t("mergeSort.guide.end");
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
