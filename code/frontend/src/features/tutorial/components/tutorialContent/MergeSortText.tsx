import tutorialContent from "./TutorialContent.module.css";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";

const MergesortText = () => {
    const { t } = useTranslation("sortsensei-tutorial");
  return (
    <div className={tutorialContent["text-container"]}>
      <>{parse(t("mergesort.explanation"))}</>
    </div>
  );
};

export default MergesortText;
