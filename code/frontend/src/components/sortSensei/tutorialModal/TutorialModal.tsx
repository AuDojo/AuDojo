import { useTutorialModal } from "@hooks/useTutorialModalContext";
import { tutorialSteps } from "@src/constants";
import styles from "@styles/sortSensei/TutorialModal.module.css";
import classNames from "classnames/bind";
import { useEffect } from "react";
import CloseButton from "./CloseButton";

// Bind styles to classNames
const cx = classNames.bind(styles);

const TutorialModal = () => {
  const { dialogRef, setCurrentStep, currentStep, refs, highlight, clearHighlight } = useTutorialModal();

  // Open the dialog as a modal when the component mounts
  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [dialogRef]);

  // Highlight the given element
  useEffect(() => {
    const { key } = tutorialSteps[currentStep - 1];
    if (key) {
      highlight(key);
    } else {
      clearHighlight();
    }
  }, [currentStep]);

  /**
   * Handle the "Previous" button click in the tutorial modal.
   * Updates the current step in the tutorial modal to the previous step.
   * If the current step is already the first step, it will stay at the first step.
   */
  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  /**
   * Handle the "Next" button click in the tutorial modal.
   * Updates the current step in the tutorial modal to the next step.
   * If the current step is already the last step, it will stay at the last step.
   */
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(tutorialSteps.length, prev + 1));
  };

  const handleFinish = () => {
    dialogRef.current?.close();
  };

  return (
    <dialog ref={dialogRef} className={cx("dialog", `step-${currentStep}`)}>
      <h2>{tutorialSteps[currentStep - 1].title}</h2>
      <p>{tutorialSteps[currentStep - 1].content}</p>
      <div className={cx("nav-buttons-container")}>
        <button className={cx("prev-button")} onClick={handlePrevious} disabled={currentStep === 1}>
          {"<"}
        </button>
        <span className={cx("slide-index")}>
          {currentStep}/{tutorialSteps.length}
        </span>
        <button
          className={cx("next-button")}
          onClick={handleNext}
          disabled={currentStep === tutorialSteps.length}
          autoFocus={true}
        >
          {">"}
        </button>
        {currentStep === tutorialSteps.length && (
          <button className={cx("finish-button")} onClick={handleFinish}>
            Finish
          </button>
        )}
      </div>
      <CloseButton />
    </dialog>
  );
};

export default TutorialModal;
