import { useTutorialModal } from "@hooks/useTutorialModalContext";
import { tutorialSteps } from "@src/constants";
import styles from "@styles/sortSensei/TutorialModal.module.css";
import classNames from "classnames/bind";

// Bind styles to classNames
const cx = classNames.bind(styles);

const ProgressBar = () => {
  const { currentStep } = useTutorialModal();

  return (
    <meter min={1} max={tutorialSteps.length} value={currentStep} className={cx("progress-bar")}>
      {currentStep}/{tutorialSteps.length}
    </meter>
  );
};

export default ProgressBar;
