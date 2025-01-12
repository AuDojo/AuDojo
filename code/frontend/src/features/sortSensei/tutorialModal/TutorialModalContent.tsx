import classNames from "classnames/bind";
import { CloseButton } from "./closeButton";
import { tutorialSteps } from "./constants";
import { useTutorialSteps } from "./context";
import { useTutorialModal } from "./hooks";
import { NavButtons } from "./navButtons";
import { ProgressBar } from "./progressBar";
import styles from "./TutorialModalContent.module.css";

// Bind styles to classNames
const cx = classNames.bind(styles);

const TutorialModalContent = () => {
  const { isOpen, closeModal } = useTutorialModal();
  const { step } = useTutorialSteps();

  if (!isOpen) {
    return <></>;
  }
  return (
    <>
      <dialog open={isOpen} className={cx("dialog", `step-${step}`)}>
        <h2>{tutorialSteps[step].title}</h2>
        <p>{tutorialSteps[step].content}</p>
        <ProgressBar min={0} max={tutorialSteps.length - 1} />
        <NavButtons closeModal={closeModal} />
        <CloseButton onClick={closeModal} />
      </dialog>
      {/* Overlay for transparent background */}
      {isOpen && <div className={cx("overlay")} onClick={closeModal}></div>}
    </>
  );
};

export default TutorialModalContent;
