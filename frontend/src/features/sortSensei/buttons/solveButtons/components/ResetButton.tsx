import { useButtonContext } from "@features/sortSensei/buttons/context";
import { useTranslation } from "react-i18next";
import { useResetTable } from "@features/sortSensei/table/hooks/useResetTable";
import { useHotkeys } from "react-hotkeys-hook";
import { HOTKEYS } from "@/lib/hotkeyMap";
import buttonStyles from "@features/sortSensei/buttons/solveButtons/SolveButtons.module.css";

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

  useHotkeys(HOTKEYS.Reset, handleReset, { preventDefault: true });

  return (
    <button
      aria-label={`Press [${HOTKEYS.Reset}]`}
      data-tooltip="top"
      className={buttonStyles["reset-button"]}
      onClick={handleReset}
    >
      {t("button.reset")} ↺
    </button>
  );
};

export default ResetButton;
