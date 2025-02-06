import { useSortContext } from "@features/sortSensei/context";
import { useTableContext } from "@features/sortSensei/table/context";
import { useButtonContext } from "@features/sortSensei/buttons/context";
import { useLineValidation } from "@/features/sortSensei/buttons/solveButtonsElements/hooks";
import { useTranslation } from "react-i18next";
import { useHotkeys } from "react-hotkeys-hook";
import { HOTKEYS } from "@/lib/hotkeyMap";
import buttonStyles from "./SolveButtons.module.css";

/**
 * BackNextButtons component renders two buttons that allow the user to navigate
 * through the steps of the sorting algorithm.
 *
 * @returns {JSX.Element} A JSX element containing two buttons.
 */
const BackNextButtons = () => {
  // step === next empty row
  const { step, setStep, processList } = useSortContext();
  const { setCellsValidation: setCellsValidation } = useTableContext();
  const { validateLine } = useLineValidation();
  const { clearPlayBackTimer } = useButtonContext();
  const { t } = useTranslation("sortsensei");

  /* Handles the "Back" button click event */
  const handleGoBack = () => {
    if (step <= 1) return;

    // stop auto checking line (playbutton timer) when back is clicked
    clearPlayBackTimer();

    setCellsValidation((prev) => {
      const updated = [...prev];
      updated[step - 1] = Array(processList[step - 1].length).fill(null);
      return updated;
    });

    setStep(step - 1);
  };

  /* Handles the "Next" button click event */
  const handleGoNext = () => {
    if (step >= processList.length) return;

    // stop auto checking line (playbutton timer) when next is clicked
    clearPlayBackTimer();

    setCellsValidation((prev) => {
      const updated = [...prev];
      updated[step] = validateLine(step);
      return updated;
    });

    setStep(step + 1);
  };

  useHotkeys(HOTKEYS.BackButton, handleGoBack, { preventDefault: true });
  useHotkeys(HOTKEYS.NextButton, handleGoNext, { preventDefault: true });

  return (
    <div className={buttonStyles["arrow-buttons-container"]}>
      <button aria-label={`Press [${HOTKEYS.BackButton}]`} data-tooltip="top" onClick={handleGoBack}>
        ← {t("button.back")}
      </button>
      <button aria-label={`Press [${HOTKEYS.NextButton}]`} data-tooltip="top" onClick={handleGoNext}>
        {t("button.next")} →
      </button>
    </div>
  );
};

export default BackNextButtons;
