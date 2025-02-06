import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSortContext } from "@features/sortSensei/context";
import { validateArray } from "@/features/sortSensei/buttons/generateButtons/utils";
import { MAX_INPUT_LENGTH } from "@features/sortSensei/buttons/contants";
import { stringToArrayNumbers, limitInputValues } from "@/features/sortSensei/buttons/generateButtons/utils";
import { useSubmitForm, FormInput } from "@features/sortSensei/buttons/generateButtons/hooks";
import buttonStyles from "@features/sortSensei/buttons/generateButtons/GenerateButtons.module.css";
import { useButtonContext } from "@features/sortSensei/buttons/context";

interface FormSubmitButtonsProps {
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormSubmitButtons = ({ isSubmitting, setIsSubmitting }: FormSubmitButtonsProps) => {
  const { sharedArray, processList } = useSortContext();
  const { t } = useTranslation("sortsensei");
  const { clearPlayBackTimer } = useButtonContext();
  const { submitUnchange, submitWithError, submitValid } = useSubmitForm(setIsSubmitting);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInput>({ mode: "onChange" });

  // fill input field with the shared array whenever shared array changes
  useEffect(() => {
    if (!processList || processList.length === 0) return;
    setValue("userInput", sharedArray.join(" "));
  }, [processList, setValue, sharedArray]);

  /**
   * This function is called whenever the user types something in the input field.
   * It removes all characters from the input that are not numbers, commas or whitespaces.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const correctString: string = limitInputValues(event.target.value);
    setValue("userInput", correctString);

    // TODO: show error message directly after input
    // const array = stringToArrayNumbers(correctString);
    // const validateResult = validateArray(array);
    // if (validateResult !== "empty" && validateResult !== "valid") {
    //   setTimeout(() => {
    //     setError("userInput", { message: validateResult });
    //   }, 100);
    // }
  };

  /**
   * Handles the submission of the form.
   * It validates the input and then calls either `submitUnchange`, `submitWithError` or `submitValid` depending on the result.
   * @param data The input data from the form.
   */
  const onSubmit = (data: FormInput) => {
    const array = stringToArrayNumbers(data.userInput);
    const validateResult = validateArray(array);

    // If the input is empty or the same as the current array, do not submit the form
    if (validateResult === "empty" || array.toString() === sharedArray.toString()) {
      submitUnchange(validateResult);
      return;
    }

    // If the array is not valid, show an error message
    if (validateResult !== "valid") {
      submitWithError(validateResult);
      return;
    }

    // if the array is valid, submit the form
    clearPlayBackTimer(); // clear timer of auto checking line
    submitValid(array);
  };

  return (
    <>
      {isSubmitting && (
        // ------- FORM ------- //
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            // INPUT field
            <input
              className={buttonStyles["input-field"]}
              type="text"
              // resgister make input values available for validation + submission
              {...register("userInput", {
                onChange: handleInputChange,
              })}
              placeholder=" 4 10 7 20 15 30 25 (Enter)"
              autoComplete="on"
              maxLength={MAX_INPUT_LENGTH}
              autoFocus
            />
          }
          {/* {errors.userInput && <div className={buttonStyles["error-message"]}>‼️ {errors.userInput.message} </div>} */}
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
        </form>
      )}

      {!isSubmitting && errors.userInput && (
        // ERROR message at the end
        <div className={buttonStyles["error-message"]}> ‼️ {errors.userInput.message}</div>
      )}
    </>
  );
};

export default FormSubmitButtons;
