import { useTutorialModalContext } from "@features/sortSensei/hooks";
import classNames from "classnames/bind";
import { tutorialSteps } from "../constants";
import styles from "./ProgressBar.module.css";

// Bind styles to classNames
const cx = classNames.bind(styles);

const ProgressBar = () => {
  const { currentStep } = useTutorialModalContext();

  return (
    <meter min={1} max={tutorialSteps.length} value={currentStep} className={cx("progress-bar")}>
      {currentStep}/{tutorialSteps.length}
    </meter>
  );
};

export default ProgressBar;
