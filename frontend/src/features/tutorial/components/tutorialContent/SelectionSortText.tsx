import { Trans, useTranslation } from "react-i18next";
import tutorialContent from "./TutorialContent.module.css";
const SelectionSortText = () => {
  const { t } = useTranslation("sortsensei-tutorial", { keyPrefix: "selectionsort" });
  return (
    <div className={tutorialContent["text-container"]}>
      <Trans i18nKey="explanation" t={t} />
    </div>
  );
};

export default SelectionSortText;
