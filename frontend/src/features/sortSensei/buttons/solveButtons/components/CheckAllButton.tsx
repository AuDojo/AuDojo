import { HOTKEYS } from "@/config/hotkeyMap";
import buttonStyles from "@features/sortSensei/buttons/solveButtons/SolveButtons.module.css";
import { useTranslation } from "react-i18next";

/**
 * CheckAllButton is a component that validates all user inputs up to the final step
 * and updates the cell validation state. It also sets the current step to the last step.
 *
 * @returns {JSX.Element} A button element that triggers the validation of all steps.
 */
const CheckAllButton = ({ handleCheckAll }: { handleCheckAll: () => void }) => {
  const { t } = useTranslation("sortsensei");

  return (
    <button
      aria-label={`Press [${HOTKEYS.CheckAll}]`}
      data-tooltip="top"
      onClick={handleCheckAll}
      className={buttonStyles["check-all-button"]}
    >
      {t("button.check-all")} ✔
    </button>
  );
};
export default CheckAllButton;
