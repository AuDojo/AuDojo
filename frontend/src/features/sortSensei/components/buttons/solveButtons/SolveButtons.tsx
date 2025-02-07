import { HOTKEYS } from "@/config/hotkeyMap";
import { useButtonContext } from "@/features/sortSensei/components/buttons/context";
import { useLineValidation } from "@/features/sortSensei/components/buttons/solveButtons/hooks";
import { useTableContext } from "@/features/sortSensei/components/table/context";
import { useResetTable } from "@/features/sortSensei/components/table/hooks/useResetTable";
import { useSortContext, useTutorialModalContext } from "@features/sortSensei/context";
import { useHotkeys } from "react-hotkeys-hook";
import { BackNextButtons, CheckAllButton, PlaySpeedController, ResetButton } from "./components";
import styles from "./SolveButtons.module.css";

const SolveButtons = () => {
  const { highlightRefs } = useTutorialModalContext();
  const { resetTable } = useResetTable();
  const { clearPlayBackTimer } = useButtonContext();
  const { validateLine } = useLineValidation();
  const { step, setStep, processList } = useSortContext();
  const { cellsValidation: cellsValidation, setCellsValidation: setCellsValidation } = useTableContext();

  // step === next empty row
  /* Handles the "Back" button click event */
  const handleGoBack = () => {
    if (step <= 1) return;

    // stop auto checking line (playbutton timer) when back is clicked
    clearPlayBackTimer();

    // reset last line
    setCellsValidation((prev) => {
      const updated = [...prev];
      updated[step - 1] = Array(processList[step - 1].length).fill(null);
      return updated;
    });

    // set last step as current
    setStep(step - 1);
  };

  /* Handles the "Next" button click event */
  const handleGoNext = () => {
    if (step >= processList.length) return;

    // stop auto checking line (playbutton timer) when next is clicked
    clearPlayBackTimer();

    // validate current line
    setCellsValidation((prev) => {
      const updated = [...prev];
      updated[step] = validateLine(step);
      return updated;
    });

    // set next step as current
    setStep(step + 1);
  };
  const handleCheckAll = () => {
    const updated = [...cellsValidation];

    // update each line validation from step
    for (let i = step; i < processList.length; i++) {
      updated[i] = validateLine(i);
    }

    setCellsValidation(updated);
    // set step to last step
    setStep(processList.length);
  };

  const handleReset = () => {
    // stop auto checking line (playbutton timer) when reset is clicked
    clearPlayBackTimer();
    // reset table
    resetTable();
  };

  useHotkeys(HOTKEYS.CheckAll, handleCheckAll, { preventDefault: true, enableOnFormTags: ["input"] });
  useHotkeys(HOTKEYS.BackButton, handleGoBack, { preventDefault: true, enableOnFormTags: ["input"] });
  useHotkeys(HOTKEYS.NextButton, handleGoNext, { preventDefault: true, enableOnFormTags: ["input"] });
  useHotkeys(HOTKEYS.Reset, handleReset, { preventDefault: true, enableOnFormTags: ["input"] });

  return (
    //action buttons: back, next, checkAll, reset
    <>
      <div ref={highlightRefs.solveButtons} className={styles["solve-buttons-container"]}>
        <BackNextButtons handleGoBack={handleGoBack} handleGoNext={handleGoNext} />
        <CheckAllButton handleCheckAll={handleCheckAll} />
        <ResetButton handleReset={handleReset} />
      </div>
      <PlaySpeedController />
    </>
  );
};

export default SolveButtons;
