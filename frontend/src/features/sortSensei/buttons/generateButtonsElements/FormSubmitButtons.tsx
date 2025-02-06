import React from "react";
import { useTranslation } from "react-i18next";
import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSortContext } from "@features/sortSensei/context";
import { useButtonContext } from "@features/sortSensei/buttons/context";
import { useResetTable } from "@features/sortSensei/table/hooks/useResetTable";
import { validateArray } from "@features/sortSensei/buttons/generateButtonsElements/utils";
import { MAX_INPUT_LENGTH, ERROR_TIMEOUT } from "@features/sortSensei/constants";

import buttonStyles from "./GenerateButtons.module.css";
import { stringToArrayNumbers, limitInputValues } from "./utils";

interface FormInput {
  userInput: string;
}

interface FormSubmitButtonsProps {
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormSubmitButtons = ({ isSubmitting, setIsSubmitting }: FormSubmitButtonsProps) => {
  const { sharedArray, setSharedArray, processList } = useSortContext();
  const { t } = useTranslation("sortsensei");
  const { clearPlayBackTimer } = useButtonContext();
  const { resetTable } = useResetTable();

  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<FormInput>({ mode: "onChange" });

  // fill input field with the shared array whenever shared array changes
  useEffect(() => {
    if (!processList || processList.length === 0) return;
    setValue("userInput", sharedArray.join(" "));
  }, [processList, setValue, sharedArray]);

  // remove strange characters from input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const correctString: string = limitInputValues(event.target.value);
    setValue("userInput", correctString);
    //TODO : show error message directly after input

    // const array = stringToArrayNumbers(correctString);
    // const validateResult = validateArray(array);
    // if (validateResult !== "empty" && validateResult !== "valid") {
    //   setTimeout(() => {
    //     setError("userInput", { message: validateResult });
    //   }, 100);
    // }
  };

  const clearErrorsWithDelay = () => {
    if (timeRef.current) clearTimeout(timeRef.current);

    timeRef.current = setTimeout(() => {
      clearErrors("userInput");
    }, ERROR_TIMEOUT);
  };

  const submitUnchange = (validateResult: string) => {
    setIsSubmitting(false);
    if (validateResult === "empty") {
      setValue("userInput", sharedArray.join(" "));
    }
  };

  const submitWithError = (validateResult: string) => {
    // set Error
    setError("userInput", { message: validateResult });

    // clear error message
    clearErrorsWithDelay();

    // close form
    setIsSubmitting(false);
  };

  const submitValid = (array: number[]) => {
    // set new array
    setSharedArray(array);
    // reset table to initial state
    resetTable();
  };

  const onSubmit = (data: FormInput) => {
    const array = stringToArrayNumbers(data.userInput);
    const validateResult = validateArray(array);

    // not submit empty array or the array is the same
    if (validateResult === "empty" || array.toString() === sharedArray.toString()) {
      submitUnchange(validateResult);
      return;
    }

    // show error message when array is not valid
    if (validateResult !== "valid") {
      submitWithError(validateResult);
      return;
    }

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
