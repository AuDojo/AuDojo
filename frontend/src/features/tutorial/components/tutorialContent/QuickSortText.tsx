import quicksortidee from "@/features/tutorial/assets/quicksortidee.png";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import tutorialContent from "./TutorialContent.module.css";

const QuickSortText = () => {
  const { t } = useTranslation("sortsensei-tutorial");
  return (
    <div className={tutorialContent["text-container"]}>
      <>{parse(t("quicksort.explanation1"))}</>
      <div className={tutorialContent["image-container"]}>
        <img src={quicksortidee} className={tutorialContent["image"]} alt="quicksort idee" />
      </div>
      <>{parse(t("quicksort.explanation2"))}</>
    </div>
  );
};

export default QuickSortText;
