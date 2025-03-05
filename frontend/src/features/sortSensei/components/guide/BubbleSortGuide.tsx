import { useSortContext } from "@/features/sortSensei/context/SortContext";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import SortGuide from "./SortGuide";

const BubbleSortGuide = () => {
  const { step, processList, bubbleElements } = useSortContext();
  const { t } = useTranslation("sortsensei", { keyPrefix: "bubbleSort.guide" });

  const getCurrentGuideText = () => {
    if (!processList.length) {
      return "Starting Bubble Sort!";
    }
    if (step === 1) {
      return <>{parse(t("start"))}</>;
    } else if (step >= 2) {
      const currentElement = processList[step - 2][bubbleElements[step - 2]];
      const nextElement = processList[step - 2][bubbleElements[step - 2] + 1];
      const isElementSorted = bubbleElements[step - 2] > bubbleElements[step - 1];
      return (
        <>
          {parse(t("swap", { currentElement, nextElement }))}
          {(isElementSorted || step === processList.length) && (
            <>
              <br />
              <br />
              {parse(t("sorted-element", { currentElement }))}
            </>
          )}
          {step === processList.length && (
            <>
              <br />
              <b>{t("sorted-end")}</b>
            </>
          )}
        </>
      );
    }
  };

  return <SortGuide heading={t("heading")} guideText={getCurrentGuideText()} />;
};

export default BubbleSortGuide;
