import { useSortContext } from "@features/sortSensei/context";
import { useTableContext } from "@features/sortSensei/table/context";
import { useLineValidation } from "@/features/sortSensei/buttons/solveButtonsElements/hooks";
import { useTranslation } from "react-i18next";
import buttonStyles from "./SolveButtons.module.css";

/**
 * CheckAllButton is a component that validates all user inputs up to the final step
 * and updates the cell validation state. It also sets the current step to the last step.
 *
 * @returns {JSX.Element} A button element that triggers the validation of all steps.
 */
const CheckAllButton = () => {
  const { step, setStep, processList } = useSortContext();
  const { cellsValidation: cellsValidation, setCellsValidation: setCellsValidation } = useTableContext();
  const { validateLine } = useLineValidation();
  const { t } = useTranslation("sortsensei");

  // step === next empty row
  const handleCheckAll = () => {
    const updated = [...cellsValidation];

    for (let i = step; i < processList.length; i++) {
      updated[i] = validateLine(i);
    }

    setCellsValidation(updated);
    setStep(processList.length);
  };

  return (
    <button
      aria-label="Press [A]"
      data-tooltip="top"
      onClick={handleCheckAll}
      className={buttonStyles["check-all-button"]}
    >
      {t("button.check-all")} ✔
    </button>
  );
};
export default CheckAllButton;
