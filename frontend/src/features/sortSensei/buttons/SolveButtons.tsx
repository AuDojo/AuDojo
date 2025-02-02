import styles from "./Buttons.module.css";
import BackNextButtons from "./BackNextButtons";
import ResetButton from "./ResetButton";
import CheckAllButton from "./CheckAllButton";
import PlaySpeedController from "./PlaySpeedController";
import { useTutorialModalContext } from "@features/sortSensei/context";

// reset button: remove timer, reset current step, reset table cell
// back next button: stop timer, set table, set step
// check all: stop timer, set step
// play button: stop and run modus, run -> activate timer with the setting of speed

const SolveButtons2 = () => {
  const { highlightRefs } = useTutorialModalContext();
  return (
    //action buttons: back, next, checkAll, reset
    <>
      <div ref={highlightRefs.solveButtons} className={styles["solve-buttons-container"]}>
        <BackNextButtons />
        <CheckAllButton />
        <ResetButton />
      </div>
      <PlaySpeedController />
    </>
  );
};

export default SolveButtons2;
