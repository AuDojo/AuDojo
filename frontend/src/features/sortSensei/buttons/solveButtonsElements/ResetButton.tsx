import { useSortContext } from "@features/sortSensei/context";
import { useTableContext } from "@features/sortSensei/table/context";
import { useButtonContext } from "@features/sortSensei/buttons/context";
import { useTranslation } from "react-i18next";
import buttonStyles from "./SolveButtons.module.css";

const ResetButton = () => {
  const { setStep, processList } = useSortContext();
  const { setUserInputTable: setUserInputTable, setCellsValidation: setCellsValidation } = useTableContext();
  const { clearPlayBackTimer } = useButtonContext();
  const { t } = useTranslation("sortsensei");

  const handleTryAgain = () => {
    setStep(1);

    // stop auto checking line (playbutton timer) when reset is clicked
    clearPlayBackTimer();

    // Reset the userinput cell values to the initial values
    setUserInputTable(processList.map((step, index) => (index === 0 ? [...step] : new Array(step.length).fill(""))));

    // Reset the cell validation to null
    setCellsValidation(processList.map((step) => new Array(step.length).fill(null)));
  };

  return (
    <button aria-label="Press [S]" data-tooltip="top" className={buttonStyles["reset-button"]} onClick={handleTryAgain}>
      {t("button.reset")} ↺
    </button>
  );
};

export default ResetButton;
