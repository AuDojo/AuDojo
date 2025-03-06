import classNames from "classnames/bind";
import { Trans, useTranslation } from "react-i18next";
import { useTutorialModalContext } from "../../context";
import { CloseButton } from "./closeButton";
import { tutorialSteps } from "./constants";
import { useTutorialSteps } from "./context";
import { useTutorialEvents } from "./hooks";
import { useHotkeysTutorial } from "./hooks/useHotkeysTutorial";
import { NavButtons } from "./navButtons";
import { ProgressBar } from "./progressBar";
import styles from "./TutorialModalContent.module.css";
// Bind styles to classNames
const cx = classNames.bind(styles);

const TutorialModalContent = () => {
  const { isTutorialOpen, closeModal } = useTutorialModalContext();
  const { step } = useTutorialSteps();
  const { t } = useTranslation("sortsensei-tutorialModal");
  useTutorialEvents();
  useHotkeysTutorial();

  if (!isTutorialOpen) {
    return <></>;
  }
  return (
    <>
      <dialog open={isTutorialOpen} className={cx("dialog", `step-${step}`)} aria-label="SortSensei Tutorial">
        <h2>{t(tutorialSteps[step].title)}</h2>
        <p>
          <Trans i18nKey={tutorialSteps[step].content} t={t} />
        </p>
        <ProgressBar min={0} max={tutorialSteps.length - 1} />
        <NavButtons closeModal={closeModal} />
        <CloseButton onClick={closeModal} />
      </dialog>
      {/* Overlay for transparent background */}
      {isTutorialOpen && (
        <div role="button" tabIndex={0} className={cx("overlay")} onClick={closeModal} onKeyDown={closeModal}></div>
      )}
    </>
  );
};

export default TutorialModalContent;
