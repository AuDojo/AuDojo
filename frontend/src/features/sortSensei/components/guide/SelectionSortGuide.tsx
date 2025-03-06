import { useSortContext } from "@/features/sortSensei/context/SortContext";
import { Trans, useTranslation } from "react-i18next";
import SortGuide from "./SortGuide";

const SelectionSortGuide = () => {
  const { step, processList, selectionElements } = useSortContext();

  const { t } = useTranslation("sortsensei", { keyPrefix: "selectionSort.guide" });

  const getCurrentGuideText = () => {
    if (!processList || processList.length === 0) {
      return "Starting Selection Sort!";
    }

    const currentArray = processList[step - 1];
    const prevArray = step > 1 ? processList[step - 2] : currentArray;
    const smallestElement = prevArray[selectionElements[step - 2]];
    const currentElement = prevArray[step - 2];
    if (step === 1) {
      return <Trans i18nKey="start" t={t} />;
    } else if (step >= 2) {
      if (step === processList.length) {
        return <>{t("end")}</>;
      }

      return (
        <Trans
          i18nKey="swap"
          t={t}
          values={{
            currentElement,
            smallestElement,
            move: step - 1,
          }}
        />
      );
    }
  };

  return <SortGuide heading={t("heading")} guideText={getCurrentGuideText()} />;
};

export default SelectionSortGuide;
