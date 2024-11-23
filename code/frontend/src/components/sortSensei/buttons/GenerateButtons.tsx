import { useState } from "react";
import { MAX_ARRAY_SIZE, MAX_INPUT_RANGE, MIN_ARRAY_SIZE, MIN_INPUT_RANGE } from "../../../constants/sorting";
import { useSortContext } from "../../../hooks/sortContextHooks";
import buttonStyles from "../../../styles/sortSensei/Button.module.css";
import { useButtonContext } from "./useButtonContext";
const GenerateButtons = () => {
  const [customArray, setCustomArray] = useState<string>("");
  const { setStep, fetchStepsList } = useSortContext();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [arrayLength, setArrayLength] = useState<number>(12);
  const [errorMessage, setErrorMessage] = useState("");

  const { timeoutRef, setSolveAllStatus } = useButtonContext();

  const toggleSubmit = () => {
    setIsSubmitting(!isSubmitting);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomArray(event.target.value);
  };

  const submitCustomArray = () => {
    setSolveAllStatus("solve");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    const array = customArray
      .split(/[,\s]+/) // split by (many) commas, #;- or whitespace
      .map((num) => parseInt(num, 10)) // convert the string to an Integer number
      .filter((num) => !isNaN(num));
    const outOfRangeNumbers = array.filter((num) => num < MIN_INPUT_RANGE || num > MAX_INPUT_RANGE);

    if (outOfRangeNumbers.length > 0) {
      setErrorMessage(`Please enter numbers only in the range ${MIN_INPUT_RANGE} to ${MAX_INPUT_RANGE}.`);
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (array.length < MIN_ARRAY_SIZE) {
      //! min array length
      setIsSubmitting(false);
      setErrorMessage(`Please enter at least ${MIN_ARRAY_SIZE} numbers.`);
      setCustomArray("");
      setTimeout(() => setErrorMessage(""), 2200);
      return;
    }
    if (array.length > MAX_ARRAY_SIZE) {
      setErrorMessage(`Please enter at most ${MAX_ARRAY_SIZE} numbers.`);
      setTimeout(() => setErrorMessage(""), 2200);
      return;
    }
    setStep(1);
    fetchStepsList(array);
    // setCustomArray("");
    setIsSubmitting(false);
  };

  const generateRandomArray = (length = 7, max = MAX_INPUT_RANGE) => {
    return Array.from({ length }, () => Math.floor(Math.random() * max + 1));
  };

  const handleRandomArray = () => {
    setStep(1);
    setSolveAllStatus("solve");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    const array = generateRandomArray(arrayLength);
    fetchStepsList(array);
    setIsSubmitting(false);
  };

  const handleArrayLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setArrayLength(value);
  };

  const handleArrayLengthKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && arrayLength >= MIN_ARRAY_SIZE && arrayLength <= MAX_ARRAY_SIZE) {
      handleRandomArray();
    }
  };

  return (
    <div className={buttonStyles["generate-buttons"]}>
      <button onClick={toggleSubmit} className={` ${buttonStyles[isSubmitting ? "close-button" : ""]}`}>
        {isSubmitting ? "Close editing" : "New custom array"}
      </button>
      <input
        type="text"
        placeholder=" 4 10 7 20 15 30 25 (Enter)"
        value={customArray}
        onChange={handleInputChange}
        className={`${!isSubmitting ? buttonStyles["no-submitting"] : ""}`}
        onKeyDown={(e) => e.key === "Enter" && submitCustomArray()}
      />
      {errorMessage && <div style={{ color: "red", fontSize: "12px" }}>{errorMessage}</div>}
      <button
        className={`${buttonStyles["submit-button"]} ${!isSubmitting ? buttonStyles["no-submitting"] : ""}`}
        onClick={submitCustomArray}
      >
        Submit
      </button>

      <button onClick={handleRandomArray}>New random array</button>
      <div className={buttonStyles["array-length-container"]}>
        <div
          style={{
            fontSize: "12px",
            fontStyle: "italic",
            color: "gray",
          }}
        >
          Random array length: ({MIN_ARRAY_SIZE}-{MAX_ARRAY_SIZE})
        </div>
        <input
          type="number"
          min={MIN_ARRAY_SIZE}
          max={MAX_ARRAY_SIZE}
          value={arrayLength}
          onChange={handleArrayLengthChange}
          onKeyDown={handleArrayLengthKeyDown}
        />
      </div>
    </div>
  );
};

export default GenerateButtons;
