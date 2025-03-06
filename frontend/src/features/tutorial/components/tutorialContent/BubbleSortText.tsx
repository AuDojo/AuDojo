import { Trans, useTranslation } from "react-i18next";
import tutorialContent from "./TutorialContent.module.css";
const BubblesortText = () => {
  const { t } = useTranslation("sortsensei-tutorial", { keyPrefix: "bubblesort" });
  return (
    <div className={tutorialContent["text-container"]}>
      <Trans i18nKey="explanation" t={t} />
    </div>
  );
};

export default BubblesortText;
