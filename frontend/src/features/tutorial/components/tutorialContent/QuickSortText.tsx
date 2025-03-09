import quicksortidee from "@/features/tutorial/assets/quicksortidee.png";
import { Trans, useTranslation } from "react-i18next";
import tutorialContent from "./TutorialContent.module.css";
const QuickSortText = () => {
  const { t } = useTranslation("sortsensei-tutorial", { keyPrefix: "quicksort" });
  return (
    <div className={tutorialContent["text-container"]}>
      <Trans i18nKey="explanation1" t={t} />
      <div className={tutorialContent["image-container"]}>
        <img src={quicksortidee} className={tutorialContent["image"]} alt="quicksort idee" />
      </div>
      <Trans i18nKey="explanation2" t={t} />
    </div>
  );
};

export default QuickSortText;
