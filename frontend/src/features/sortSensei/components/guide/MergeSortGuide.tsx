// MergeSortGuide.tsx
import { useSortContext } from "@/features/sortSensei/context/SortContext";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import SortGuide from "./SortGuide";
const MergeSortGuide = () => {
  const { step, mergeRanges, processList } = useSortContext();
  const { t } = useTranslation("sortsensei", { keyPrefix: "mergeSort.guide" });

  const getCurrentGuideText = () => {
    const currentRange = mergeRanges[step - 1];
    if (!processList || processList.length === 0) {
      return <>{t("start")}</>;
    }
    if (!currentRange || currentRange[0] === -1 || step === 1) {
      return <>{parse(t("splitting"))}</>;
    }

    const [start, end] = currentRange;
    const length = end - start + 1;

    if (length === 1) {
      return "An array of length 1 is already sorted.";
    } else if (length === 2) {
      return <>{parse(t("compare"))}</>;
    } else if (length === processList.length) {
      return <>{t("end")}</>;
    } else {
      if (step === 1) {
        return "Split the array into two halves.";
      }
      return <>{parse(t("merge"))}</>;
    }
  };

  return <SortGuide heading={t("heading")} renderGuideText={getCurrentGuideText} />;
};

export default MergeSortGuide;
