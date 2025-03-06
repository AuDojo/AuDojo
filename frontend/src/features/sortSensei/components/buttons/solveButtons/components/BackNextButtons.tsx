import { HOTKEYS } from "@/config/hotkeyMap";
import { useTranslation } from "react-i18next";
import buttonStyles from "../SolveButtons.module.css";

/**
 * BackNextButtons component renders two buttons that allow the user to navigate
 * through the steps of the sorting algorithm.
 *
 * @returns  A JSX element containing two buttons.
 */
const BackNextButtons = ({ handleGoBack, handleGoNext }: { handleGoBack: () => void; handleGoNext: () => void }) => {
  const { t } = useTranslation("sortsensei");
  return (
    <div className={buttonStyles["arrow-buttons-container"]}>
      <button
        type="button"
        aria-label={`Previous line [${HOTKEYS.BackButton}]`}
        data-tooltip="top"
        onClick={handleGoBack}
      >
        ← {t("button.back")}
      </button>
      <button type="button" aria-label={`Next line [${HOTKEYS.NextButton}]`} data-tooltip="top" onClick={handleGoNext}>
        {t("button.next")} →
      </button>
    </div>
  );
};

export default BackNextButtons;
