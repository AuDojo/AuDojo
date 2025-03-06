import { Trans, useTranslation } from "react-i18next";
import tutorialContent from "./TutorialContent.module.css";
const MergesortText = () => {
  const { t } = useTranslation("sortsensei-tutorial", { keyPrefix: "mergesort" });
  return (
    <div className={tutorialContent["text-container"]}>
      <Trans i18nKey="explanation" t={t} />
    </div>
  );
};

export default MergesortText;
