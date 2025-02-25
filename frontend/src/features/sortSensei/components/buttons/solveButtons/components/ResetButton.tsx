import { HOTKEYS } from "@/config/hotkeyMap";
import { useTranslation } from "react-i18next";
import buttonStyles from "../SolveButtons.module.css";

const ResetButton = ({ handleReset }: { handleReset: () => void }) => {
  const { t } = useTranslation("sortsensei");

  return (
    <button
      aria-label={`Reset table [${HOTKEYS.Reset}]`}
      data-tooltip="top"
      className={buttonStyles["reset-button"]}
      onClick={handleReset}
    >
      {t("button.reset")} ↺
    </button>
  );
};

export default ResetButton;
