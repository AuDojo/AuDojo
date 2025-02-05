import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSortContext } from "@features/sortSensei/context";
import {
  MAX_ARRAY_SIZE,
  MAX_INPUT_LENGTH,
  MAX_INPUT_RANGE,
  MIN_ARRAY_SIZE,
  MIN_INPUT_RANGE,
} from "@features/sortSensei/constants";
import buttonStyles from "./GenerateButtons.module.css";

interface FormInput {
  userInput: string;
}

const CustomArrayButton = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { t } = useTranslation("sortsensei");
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const { sharedArray, setSharedArray } = useSortContext();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormInput>({ mode: "onChange" });

  const toggleCustomArray = () => {
    setIsSubmitting(!isSubmitting);
  };

  const stringToArrayNumbers = (str: string): number[] => {
    return (
      str
        .match(/\d+/g) // Match sequences of digits
        ?.map((num) => parseInt(num, 10)) // Convert strings to integers
        .filter((num) => !isNaN(num)) ?? [] // / Remove any NaN values and return an empty array if no matches
    );
  };

  const validateArray = (array: number[]) => {
    if (array.length === 0) return "empty";
    if (array.length > MAX_ARRAY_SIZE) {
      return t("error-message.to-many", { max: MAX_ARRAY_SIZE });
    }
    if (0 < array.length && array.length < MIN_ARRAY_SIZE) {
      return t("error-message.to-few", { min: MIN_ARRAY_SIZE });
    }
    if (array.some((n) => n < MIN_INPUT_RANGE || n > MAX_INPUT_RANGE)) {
      return t("error-message.range", { min: MIN_INPUT_RANGE, max: MAX_INPUT_RANGE });
    }

    // valid array
    return "valid";
  };

  const onSubmit = (data: FormInput) => {
    const customArray = stringToArrayNumbers(data.userInput);
    const validateResult = validateArray(customArray);

    if (validateResult === "empty") return; // not submit empty array

    if (validateResult === "valid") {
      console.log("Valid array: ", customArray);

      setValue("userInput", customArray.join(" "));

      setSharedArray(customArray);
    } else {
      setError("userInput", { message: validateResult });

      if (timeRef.current) clearTimeout(timeRef.current);
      timeRef.current = setTimeout(() => clearErrors("userInput"), 2500);

      return;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const correctValue = event.currentTarget.value.replace(/[^0-9,\s]+/g, ""); // allow numbers, commas and whitespaces
    setValue("userInput", correctValue);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            // INPUT field
            <input
              className={buttonStyles["input-field"]}
              type="text"
              // resgister make input values available for validation + submission
              {...register("userInput", {})}
              onChange={handleInputChange}
              placeholder=" 4 10 7 20 15 30 25 (Enter)"
              autoComplete="off" //? firefox gives suggestions for old input values (keep on or off)
              maxLength={MAX_INPUT_LENGTH}
            />
          }

          {errors.userInput && (
            // ERROR message
            <div className={buttonStyles["error-message"]}>{errors.userInput.message}</div>
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
        </form>
      )}
    </>
  );
};

export default CustomArrayButton;
