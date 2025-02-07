import { HOTKEYS } from "@/config/hotkeyMap";
import buttonStyles from "@features/sortSensei/buttons/solveButtons/SolveButtons.module.css";
import { useTranslation } from "react-i18next";

const ResetButton = ({ handleReset }: { handleReset: () => void }) => {
  const { t } = useTranslation("sortsensei");

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
