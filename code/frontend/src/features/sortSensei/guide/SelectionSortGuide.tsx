// MergeSortGuide.tsx
import { useSortContext } from "@/hooks";
import styles from "./SortGuide.module.css";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";

const SelectionSortGuide = () => {
  const { step, stepsList, selectionElement } = useSortContext();

  const { t } = useTranslation("sortsensei");

  const getCurrentGuideText = () => {
    if (!stepsList || stepsList.length === 0) {
      return "Starting Selection Sort!";
    }

    const currentArray = stepsList[step - 1];
    const prevArray = step > 1 ? stepsList[step - 2] : currentArray;
    const smallestElement = prevArray[selectionElement[step - 2]];
    const currentElement = prevArray[step - 2];
    if (step === 1) {
      return <>{parse(t("selectionSort.guide.start"))}</>;
    } else if (step >= 2) {
      if (step === stepsList.length) {
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
