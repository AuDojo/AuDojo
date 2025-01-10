import { useTutorialModalContext } from "@features/sortSensei/hooks";
import classNames from "classnames/bind";
import { useCallback, useEffect, useRef } from "react";
import { CloseButton } from "./closeButton";
import { tutorialSteps } from "./constants";
import ProgressBar from "./progressBar/ProgressBar";
import styles from "./TutorialModal.module.css";

// Bind styles to classNames
const cx = classNames.bind(styles);

const TutorialModal = () => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const { dialogRef, setCurrentStep, currentStep, highlight, clearHighlight } = useTutorialModalContext();

  // Open the dialog as a modal when the component mounts
  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.show();
    }
  }, [dialogRef]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, shiftKey } = event;
      if (key === "ArrowLeft" || (key === "Enter" && shiftKey)) {
        handlePrevious();
      } else if (key === "ArrowRight" || key === "Enter") {
        handleNext();
      }
      if (key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Highlight the given element
  useEffect(() => {
    const { key } = tutorialSteps[currentStep - 1];
    if (key) {
      highlight(key);
    } else {
      clearHighlight();
    }
  }, [currentStep, highlight, clearHighlight]);

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

  const closeModal = useCallback(() => {
    clearHighlight();
    dialogRef.current?.close();
    overlayRef.current?.classList.remove(cx("open"));
  }, []);

  return (
    <>
      <dialog ref={dialogRef} className={cx("dialog", `step-${currentStep}`)}>
        {/* Header  */}
        <h2>{tutorialSteps[currentStep - 1].title}</h2>
        {/* Content */}
        <p>{tutorialSteps[currentStep - 1].content}</p>
        <ProgressBar />
        <div className={cx("nav-buttons-container")}>
          {/* Buttons */}
          {currentStep === 1 && (
            <button className={cx("start-button")} onClick={handleNext}>
              Start
            </button>
          )}
          {currentStep > 1 && (
            <button className={cx("back-button")} onClick={handlePrevious}>
              Back
            </button>
          )}
          {/* <span className={cx("slide-index")}>
            {currentStep}/{tutorialSteps.length}
          </span> */}
          {currentStep > 1 && currentStep < tutorialSteps.length && (
            <button className={cx("next-button")} onClick={handleNext}>
              Next
            </button>
          )}
          {currentStep === tutorialSteps.length && (
            <button className={cx("finish-button")} onClick={closeModal}>
              Finish
            </button>
          )}
        </div>
        <CloseButton onClick={closeModal} />
      </dialog>
      {/* Overlay for transparent background */}
      <div className={cx("overlay", "open")} ref={overlayRef} onClick={closeModal}></div>
    </>
  );
};

export default TutorialModal;
