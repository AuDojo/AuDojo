import { HOTKEYS } from "@/config/hotkeyMap";
import { useTranslation } from "react-i18next";
import buttonStyles from "../GenerateButtons.module.css";

interface CustomArrayButtonProps {
  isSubmitting: boolean;
  toggleCustomArray: () => void;
}

const CustomArrayButton = ({ isSubmitting, toggleCustomArray }: CustomArrayButtonProps) => {
  const { t } = useTranslation("sortsensei");

  return (
    <>
      {!isSubmitting && (
        // CUSTOM array button
        <button
          className={buttonStyles["custom-array-button"]}
          aria-label={`Custom [${HOTKEYS.Custom}]`}
          data-tooltip="top"
          onClick={toggleCustomArray}
        >
          {t("button.new-custom")}
        </button>
      )}

      {isSubmitting && (
        // CLOSE button
        <button
          className={buttonStyles["close-button"]}
          aria-label={`Close [${HOTKEYS.Close[0]}]`}
          data-tooltip="top"
          onClick={toggleCustomArray}
        >
          {t("button.close")} ✗
        </button>
      )}
    </>
  );
};

export default CustomArrayButton;
