import classNames from "classnames/bind";
import { useTutorialSteps } from "../context";
import styles from "./ProgressBar.module.css";

// Bind styles to classNames
const cx = classNames.bind(styles);

interface ProgressBarProps {
  min: number;
  max: number;
}

const ProgressBar = ({ min, max }: ProgressBarProps) => {
  const { step } = useTutorialSteps();

  return (
    <meter min={min} max={max} value={step} className={cx("progress-bar")}>
      {step}/{max}
    </meter>
  );
};

export default ProgressBar;
