import { useTranslation } from "react-i18next";
import { useState } from "react";

import buttonStyles from "./GenerateButtons.module.css";
import FormSubmitButtons from "./FormSubmitButtons";

const CustomArrayButton = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { t } = useTranslation("sortsensei");

  const toggleCustomArray = () => {
    setIsSubmitting(!isSubmitting);
  };

  return (
    <>
      {!isSubmitting && (
        // CUSTOM array button
        <button
          className={buttonStyles["custom-array-button"]}
          aria-label="Custom [C]"
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
          aria-label="Close [C]"
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
