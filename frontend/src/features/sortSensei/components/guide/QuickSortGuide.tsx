// MergeSortGuide.tsx
import { useSortContext } from "@/features/sortSensei/context/SortContext";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import SortGuide from "./SortGuide";

const QuickSortGuide = () => {
  const { step, processList, pivotElements } = useSortContext();

  const { t } = useTranslation("sortsensei", { keyPrefix: "quickSort.guide" });

  const getCurrentGuideText = () => {
    if (!processList || processList.length === 0) {
      return "Starting Quick Sort!";
    }
    if (step === 1) {
      const lastElement = processList[0][processList[0].length - 1];
      return <>{parse(t("choose", { lastElement }))}</>;
    } else if (step >= 2) {
      const prevArray = processList[step - 2];
      const pivot = prevArray[pivotElements[step - 1][0]];
      const currentArray = processList[step - 1];
      const nextPivot = step !== processList.length ? currentArray[pivotElements[step][0]] : 0;

      if (!nextPivot) {
        return <>{parse(t("end", { pivot }))}</>;
      }

      return <>{parse(t("after-partition", { pivot, nextPivot }))}</>;
    }
  };

  return <SortGuide heading={t("heading")} renderGuideText={getCurrentGuideText} />;
};

export default QuickSortGuide;
