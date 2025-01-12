// MergeSortGuide.tsx
import { useSortContext } from "@/hooks";
import styles from "./SortGuide.module.css";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";

const QuickSortGuide = () => {
  const { step, stepsList, pivotElement } = useSortContext();

  const { t } = useTranslation("sortsensei");

  const getCurrentGuideText = () => {
    if (!stepsList || stepsList.length === 0) {
      return "Starting Quick Sort!";
    }
    if (step === 1) {
      let lastElement = stepsList[0][stepsList[0].length - 1];
      return <>{parse(t("quickSort.guide.choose", { lastElement: lastElement }))}</>;
    } else if (step >= 2) {
      const prevArray = stepsList[step - 2];
      const pivot = prevArray[pivotElement[step - 1][0]];
      const currentArray = stepsList[step - 1];
      const nextPivot = step !== stepsList.length ? currentArray[pivotElement[step][0]] : 0;

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
