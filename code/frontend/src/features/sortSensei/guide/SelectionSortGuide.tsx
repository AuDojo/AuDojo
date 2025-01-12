// MergeSortGuide.tsx
import { useSortContext } from "@/features/sortSensei/context/SortContext";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import styles from "./SortGuide.module.css";

const SelectionSortGuide = () => {
  const { step, processList, selectionElements } = useSortContext();

  const { t } = useTranslation("sortsensei");

  const getCurrentGuideText = () => {
    if (!processList || processList.length === 0) {
      return "Starting Selection Sort!";
    }

    const currentArray = processList[step - 1];
    const prevArray = step > 1 ? processList[step - 2] : currentArray;
    const smallestElement = prevArray[selectionElements[step - 2]];
    const currentElement = prevArray[step - 2];
    if (step === 1) {
      return <>{parse(t("selectionSort.guide.start"))}</>;
    } else if (step >= 2) {
      if (step === processList.length) {
        return <>{t("selectionSort.guide.end")}</>;
      }

      return (
        <>
          {parse(
            t("selectionSort.guide.swap", {
              currentElement: currentElement,
              smallestElement: smallestElement,
              move: step - 1,
            })
          )}
        </>
      );
    }
  };

  return (
    <div className={styles.guide}>
      <h3>{t("selectionSort.guide.header")}</h3>
      <div className={styles.step}>
        <p>{getCurrentGuideText()}</p>
      </div>
    </div>
  );
};

export default SelectionSortGuide;
