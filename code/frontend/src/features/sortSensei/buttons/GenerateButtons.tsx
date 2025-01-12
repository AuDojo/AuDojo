import { MAX_ARRAY_SIZE, MAX_INPUT_RANGE, MIN_ARRAY_SIZE, MIN_INPUT_RANGE } from "@/features/sortSensei/constants";
import { useSortContext, useTutorialModalContext } from "@/features/sortSensei/context";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import buttonStyles from "./Button.module.css";
import { useButtonContext } from "./context";

const GenerateButtons = () => {
  const { setSharedArray, setStep, sharedArray, processList } = useSortContext();
  const [customArray, setCustomArray] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [arrayLength, setArrayLength] = useState<number>(sharedArray.length);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { timeoutRef, setSolveAllStatus } = useButtonContext();
  const { highlightRefs } = useTutorialModalContext();
  const { t } = useTranslation("sortsensei");

  // Set input value in submit field to the current array
  useEffect(() => {
    if (!processList || processList.length === 0) return;
    setCustomArray(processList[0].join(" "));
  }, [processList]);

  const toggleSubmit = useCallback(() => {
    setIsSubmitting(!isSubmitting);
  }, [isSubmitting]);

  useEffect(() => {
    if (isSubmitting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSubmitting]);

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
      setErrorMessage(t("error-message.range", { min: MIN_INPUT_RANGE, max: MAX_INPUT_RANGE }));
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (array.length < MIN_ARRAY_SIZE) {
      //! min array length
      setIsSubmitting(false);
      setErrorMessage(t("error-message.to-few", { min: MIN_ARRAY_SIZE }));
      setCustomArray("");
      setTimeout(() => setErrorMessage(""), 2200);
      return;
    }
    if (array.length > MAX_ARRAY_SIZE) {
      setErrorMessage(t("error-message.to-many", { max: MAX_ARRAY_SIZE }));
      setTimeout(() => setErrorMessage(""), 2200);
      return;
    }
    setStep(1);
    setSharedArray(array);

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
    setSharedArray(array);
    setIsSubmitting(false);
  }, [arrayLength, setSolveAllStatus, setStep, timeoutRef]);

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

  return (
    <div className={buttonStyles["generate-buttons"]} ref={highlightRefs.generateButtons}>
      {/* <Tooltip direction="bottom" content="C"> */}
      <button
        aria-label={isSubmitting ? "Close [C]" : "Custom [C]"}
        data-tooltip="left"
        onClick={toggleSubmit}
        className={`${buttonStyles[isSubmitting ? "close-button" : ""]}`}
      >
        {isSubmitting ? "Close ✗" : t("button.new-custom")}
      </button>
      {/* </Tooltip> */}

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
        <button
          aria-label="Submit [Enter]"
          data-tooltip="left"
          className={`${buttonStyles["submit-button"]}`}
          onClick={submitCustomArray}
        >
          Submit ↩
        </button>
      )}
      {isSubmitting && <div></div>}
      <button aria-label="Random [R]" data-tooltip="left" onClick={handleRandomArray}>
        {t("button.new-random")}
      </button>
      <div className={buttonStyles["array-length-container"]}>
        <div
          style={{
            fontSize: "12px",
            fontStyle: "italic",
            color: "gray",
          }}
        >
          {t("length-input-info", { min: MIN_ARRAY_SIZE, max: MAX_ARRAY_SIZE })}
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
