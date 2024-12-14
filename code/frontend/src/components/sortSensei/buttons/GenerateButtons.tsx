import { MAX_ARRAY_SIZE, MAX_INPUT_RANGE, MIN_ARRAY_SIZE, MIN_INPUT_RANGE } from "@constants/index";
import { useButtonContext, useSortContext } from "@hooks/index";
import { useTutorialModal } from "@src/hooks/useTutorialModalContext";
import buttonStyles from "@styles/sortSensei/Button.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Tooltip from "../Tooltip";

const GenerateButtons = () => {
  const { setStep, fetchStepsList, stepsList, sharedArray } = useSortContext();
  const [customArray, setCustomArray] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [arrayLength, setArrayLength] = useState<number>(sharedArray.length);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { timeoutRef, setSolveAllStatus } = useButtonContext();
  const { refs } = useTutorialModal();

  // Set input value in submit field to the current array
  useEffect(() => {
    if (!stepsList || stepsList.length === 0) return;
    setCustomArray(stepsList[0].join(" "));
  }, [stepsList]);

  const toggleSubmit = useCallback(() => {
    setIsSubmitting(!isSubmitting);
  }, [isSubmitting]);

  useEffect(() => {
    if (isSubmitting && inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Regex to check if input contins only numbers, commas or whitespaces
    const regex = /^[0-9,\s]*$/;
    if (!regex.test(event.target.value)) {
      return;
    }
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

  const handleRandomArray = useCallback(() => {
    setStep(1);
    setSolveAllStatus("solve");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    const array = generateRandomArray(arrayLength);
    fetchStepsList(array);
    setIsSubmitting(false);
  }, [arrayLength, fetchStepsList, setSolveAllStatus, setStep, timeoutRef]);

  const handleArrayLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setArrayLength(value);
  };

  const handleArrayLengthKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && arrayLength >= MIN_ARRAY_SIZE && arrayLength <= MAX_ARRAY_SIZE) {
      handleRandomArray();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) {
        if (event.key === "Escape" && isSubmitting) {
          setIsSubmitting(false);
        } else if (event.key === "c" || event.key === "C") {
          toggleSubmit();
        } else if (event.key === "r" || event.key === "R") {
          handleRandomArray();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSubmitting, toggleSubmit, handleRandomArray]);

  if (!stepsList || stepsList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={buttonStyles["generate-buttons"]}
      ref={(el) => {
        if (el) refs.generateButtons.current = el;
      }}
    >
      <Tooltip direction="left" content="C">
        <button onClick={toggleSubmit} className={`${buttonStyles[isSubmitting ? "close-button" : ""]}`}>
          {isSubmitting ? "Close editing" : "New custom array"}
        </button>
      </Tooltip>

      {isSubmitting && (
        <input
          ref={inputRef}
          type="text"
          placeholder=" 4 10 7 20 15 30 25 (Enter)"
          value={customArray}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && submitCustomArray()}
        />
      )}
      {errorMessage && <div style={{ color: "red", fontSize: "12px" }}>{errorMessage}</div>}

      {isSubmitting && (
        <Tooltip direction="left" content="Enter">
          <button className={`${buttonStyles["submit-button"]}`} onClick={submitCustomArray}>
            Submit
          </button>
        </Tooltip>
      )}
      {isSubmitting && <div></div>}
      <Tooltip direction="left" content="R">
        <button onClick={handleRandomArray}>New random array</button>
      </Tooltip>
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
