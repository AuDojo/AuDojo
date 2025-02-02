import { useSortContext } from "@features/sortSensei/context";
import { useTableContext } from "@features/sortSensei/table/context";
import buttonStyles from "./Buttons.module.css";
import { useButtonContext } from "./context";

const ResetButton = () => {
  const { setStep, processList } = useSortContext();
  const { setInputCellValues, setCellValidation } = useTableContext();
  const { clearPlayBackTimer } = useButtonContext();

  const handleTryAgain = () => {
    setStep(1);

    // stop auto checking line (playbutton timer) when reset is clicked
    clearPlayBackTimer();

    // Reset the userinput cell values to the initial values
    setInputCellValues(processList.map((step, index) => (index === 0 ? [...step] : new Array(step.length).fill(""))));

    // Reset the cell validation to null
    setCellValidation(processList.map((step) => new Array(step.length).fill(null)));
  };

  return (
    <button aria-label="Press [S]" data-tooltip="top" className={buttonStyles["reset-button"]} onClick={handleTryAgain}>
      Reset ↺
    </button>
  );
};

export default ResetButton;
