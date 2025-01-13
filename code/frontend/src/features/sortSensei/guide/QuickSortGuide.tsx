// MergeSortGuide.tsx
import { useSortContext } from "@/features/sortSensei/context/SortContext";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import styles from "./SortGuide.module.css";

const QuickSortGuide = () => {
  const { step, processList, pivotElements } = useSortContext();

  const { t } = useTranslation("sortsensei");

  const getCurrentGuideText = () => {
    if (!processList || processList.length === 0) {
      return "Starting Quick Sort!";
    }
    if (step === 1) {
      let lastElement = processList[0][processList[0].length - 1];
      return <>{parse(t("quickSort.guide.choose", { lastElement: lastElement }))}</>;
    } else if (step >= 2) {
      const prevArray = processList[step - 2];
      const pivot = prevArray[pivotElements[step - 1][0]];
      const currentArray = processList[step - 1];
      const nextPivot = step !== processList.length ? currentArray[pivotElements[step][0]] : 0;

      if (!nextPivot) {
        return <>{parse(t("quickSort.guide.end", { pivot }))}</>;
      }

      return <>{parse(t("quickSort.guide.after-partition", { pivot: pivot, nextPivot: nextPivot }))}</>;
    }
  };

  return (
    <div className={styles.guide}>
      <h3>{t("quickSort.guide.heading")}</h3>
      <div className={styles.step}>
        <p>{getCurrentGuideText()}</p>
      </div>
    </div>
  );
};

export default QuickSortGuide;
