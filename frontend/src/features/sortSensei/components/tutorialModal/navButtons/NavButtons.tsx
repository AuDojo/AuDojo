import classNames from "classnames/bind";
import { tutorialSteps } from "../constants";
import { useTutorialSteps } from "../context";
import styles from "./NavButtons.module.css";

const cx = classNames.bind(styles);

interface NavButtonsProps {
  closeModal: () => void;
}

const NavButtons = ({ closeModal }: NavButtonsProps) => {
  const { step, handleNext, handlePrevious } = useTutorialSteps();

  return (
    <div className={cx("nav-buttons-container")}>
      {/* Buttons */}
      {step === 0 && (
        <button type="button" className={cx("start-button")} onClick={handleNext}>
          Start
        </button>
      )}
      {step > 0 && (
        <button type="button" className={cx("back-button")} onClick={handlePrevious}>
          Back
        </button>
      )}
      {step > 0 && step < tutorialSteps.length - 1 && (
        <button type="button" className={cx("next-button")} onClick={handleNext}>
          Next
        </button>
      )}
      {step === tutorialSteps.length - 1 && (
        <button type="button" className={cx("finish-button")} onClick={closeModal}>
          Finish
        </button>
      )}
    </div>
  );
};

export default NavButtons;
