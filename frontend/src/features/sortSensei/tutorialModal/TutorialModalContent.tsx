import classNames from "classnames/bind";
import { CloseButton } from "./closeButton";
import { tutorialSteps } from "./constants";
import { useTutorialSteps } from "./context";
import { useTutorialModal } from "./hooks";
import { NavButtons } from "./navButtons";
import { ProgressBar } from "./progressBar";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import styles from "./TutorialModalContent.module.css";

// Bind styles to classNames
const cx = classNames.bind(styles);

const TutorialModalContent = () => {
  const { isOpen, closeModal } = useTutorialModal();
  const { step } = useTutorialSteps();
  const { t } = useTranslation("sortsensei-tutorialModal");

  if (!isOpen) {
    return <></>;
  }
  return (
    <>
      <dialog open={isOpen} className={cx("dialog", `step-${step}`)}>
        <h2>{t(tutorialSteps[step].title)}</h2>
        <p>{parse(t(tutorialSteps[step].content))}</p>
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
