import { useButtonContext } from "@features/sortSensei/buttons/context";
import { useTranslation } from "react-i18next";
import buttonStyles from "./SolveButtons.module.css";
import { useResetTable } from "@features/sortSensei/table/hooks/useResetTable";
const ResetButton = () => {
  const { resetTable } = useResetTable();
  const { clearPlayBackTimer } = useButtonContext();
  const { t } = useTranslation("sortsensei");

  const handleReset = () => {
    // stop auto checking line (playbutton timer) when reset is clicked
    clearPlayBackTimer();
    // reset table
    resetTable();
  };

  return (
    <button aria-label="Press [S]" data-tooltip="top" className={buttonStyles["reset-button"]} onClick={handleReset}>
      {t("button.reset")} ↺
    </button>
  );
};

export default ResetButton;
