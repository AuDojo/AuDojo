import { useTranslation } from "react-i18next";
import { useState } from "react";
// import { useForm } from "react-hook-form";
import buttonStyles from "./GenerateButtons.module.css";
// import { register } from "module";

interface FormInput {
  customArray: string;
}

const CustomArrayButton = () => {
  const { t } = useTranslation("sortsensei");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // const { register, handleSubmit } = useForm<FormInput>();
  const [errorMessage, setErrorMessage] = useState("hi");

  const toggleCustomArray = () => {
    setIsSubmitting(!isSubmitting);
  };

  const onSubmit = (data: FormInput) => {
    console.log(data.customArray);
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

      {isSubmitting && (
        // ------- FORM ------- //
        <form>
          {
            // INPUT field
            <input
              className={buttonStyles["input-field"]}
              type="text"
              // resgister make input values available for validation + submission
              // {...register("customArray")}
              placeholder=" 4 10 7 20 15 30 25 (Enter)"
            />
          }

          {errorMessage && (
            // ERROR message
            <div className={buttonStyles["error-message"]}>{errorMessage}</div>
          )}

          {
            // SUBMIT button
            <button
              className={buttonStyles["submit-button"]}
              type="submit"
              aria-label="Submit [Enter]"
              data-tooltip="top"
            >
              {t("button.submit")} ↩
            </button>
          }

          {
            // Margin bottom
            <div></div>
          }
        </form>
      )}
    </>
  );
};

export default CustomArrayButton;
