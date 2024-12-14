import { useTutorialModal } from "@hooks/useTutorialModalContext";
import { tutorialSteps } from "@src/constants";
import styles from "@styles/sortSensei/TutorialModal.module.css";
import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";

// Bind styles to classNames
const cx = classNames.bind(styles);

const TutorialModal = () => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const { dialogRef, setCurrentStep, currentStep, highlight, clearHighlight } = useTutorialModal();

  // Open the dialog as a modal when the component mounts
  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.show();
    }
  }, [dialogRef]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "Escape":
          closeModal();
          break;
        default:
          break;
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

  const closeModal = () => {
    dialogRef.current?.close();
    overlayRef.current?.classList.remove(cx("open"));
  };

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
          {currentStep !== 1 && (
            <button className={cx("prev-button")} onClick={handlePrevious}>
              Back
            </button>
          )}
          {/* <span className={cx("slide-index")}>
            {currentStep}/{tutorialSteps.length}
          </span> */}
          {currentStep < tutorialSteps.length && (
            <button
              className={cx("next-button")}
              onClick={handleNext}
              disabled={currentStep === tutorialSteps.length}
              autoFocus={true}
            >
              Next
            </button>
          )}
          {currentStep === tutorialSteps.length && (
            <button className={cx("finish-button")} onClick={closeModal}>
              Finish
            </button>
          )}
        </div>
        {/* Close button */}
        <button onClick={closeModal} className={styles["close-button"]}>
          &#128473;
        </button>
      </dialog>
      {/* Overlay for transparent background */}
      <div className={cx("overlay", "open")} ref={overlayRef} onClick={closeModal}></div>
    </>
  );
};

export default TutorialModal;
