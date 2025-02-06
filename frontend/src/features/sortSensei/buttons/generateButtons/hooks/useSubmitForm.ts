import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useSortContext } from "@features/sortSensei/context";
import { useResetTable } from "@features/sortSensei/table/hooks/useResetTable";
import { ERROR_TIMEOUT } from "@features/sortSensei/buttons/contants";

export interface FormInput {
  userInput: string;
}

export const useSubmitForm = (setIsSubmitting: (value: boolean) => void) => {
  const { resetTable } = useResetTable();
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const { sharedArray, setSharedArray } = useSortContext();
  const { setError, clearErrors, setValue } = useForm<FormInput>({ mode: "onChange" });

  /**
   * Clear the error message with a delay.
   * The error message is cleared after a certain amount of time.
   */
  const clearErrorsWithDelay = () => {
    // clear the previous timeout
    if (timeRef.current) clearTimeout(timeRef.current);

    // set a new timeout
    timeRef.current = setTimeout(() => {
      // clear the error
      clearErrors("userInput");
    }, ERROR_TIMEOUT);
  };

  /**
   * Handles the submission of an unchanged input.
   * If the input is empty, it resets the user input field to the current shared array.
   * @param validateResult The validation result of the input.
   */
  const submitUnchange = (validateResult: string) => {
    // Indicate that the form is no longer submitting
    setIsSubmitting(false);

    // If the input is empty, reset the input field to the shared array
    if (validateResult === "empty") {
      setValue("userInput", sharedArray.join(" "));
    }
  };

  /**
   * Handles the submission of the form with an error.
   * It sets the error below the "userInput" field and clears the error after a certain amount of time.
   * @param validateResult The validation result of the input.
   */
  const submitWithError = (validateResult: string) => {
    // Set the error on the "userInput" field
    setError("userInput", { message: validateResult });

    // Clear the error message after a certain amount of time
    clearErrorsWithDelay();

    // Close the form
    setIsSubmitting(false);
  };

  /**
   * Submits a valid array input.
   * Updates the shared array with the new values and resets the table.
   * @param array The validated array to be set as the shared array.
   */
  const submitValid = (array: number[]) => {
    // Update the shared array with the new valid array
    setSharedArray(array);

    // Reset the table to its initial state after updating the array
    resetTable();
  };
  return {
    submitUnchange,
    submitWithError,
    submitValid,
  };
};
