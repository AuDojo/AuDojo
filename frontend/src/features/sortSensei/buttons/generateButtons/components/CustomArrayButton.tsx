import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { HOTKEYS } from "@/lib/hotkeyMap";

import buttonStyles from "@features/sortSensei/buttons/generateButtons/generateButtons.module.css";
import FormSubmitButtons from "./FormSubmitButtons";

const CustomArrayButton = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { t } = useTranslation("sortsensei");

  const toggleCustomArray = () => {
    setIsSubmitting(!isSubmitting);
  };

  useHotkeys(isSubmitting ? HOTKEYS.Close : HOTKEYS.Custom, toggleCustomArray, {
    preventDefault: true,
    enableOnFormTags: ["input"],
  });

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

      {<FormSubmitButtons isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />}
    </>
  );
};

export default CustomArrayButton;
