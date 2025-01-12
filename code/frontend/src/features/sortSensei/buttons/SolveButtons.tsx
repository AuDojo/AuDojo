import { SortTypes } from "@/features/sortSensei/constants";
import { useSortContext } from "@/features/sortSensei/context/SortContext";
import { useTutorialModalContext } from "@features/sortSensei/context";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Points } from "../points";
import { useTableContext } from "../table/context";
import buttonStyles from "./Button.module.css";
import { useButtonContext } from "./context";

const SPEED_VALUES = [5000, 4000, 2500, 1500, 1000, 500, 5];
const DEFAULT_SPEED_INDEX = 3;
const SPEED_DISPLAY = ["0.25", "0.5", "0.75", "1.0", "1.25", "1.5", "15"];

const SolveButton = () => {
  const { step, processList, mergeRanges, sortTypeRef, selectionElements, bubbleElements, setStep } = useSortContext();
  const { inputCellValues, setInputCellValues, setCellValidation } = useTableContext();
  const { highlightRefs } = useTutorialModalContext();

  const { t } = useTranslation("sortsensei");

  const { timeoutRef, solveAllStatus, setSolveAllStatus } = useButtonContext();
  const isSolvingRef = useRef<boolean>(false);
  const currentStepRef = useRef<number>(step);
  const [selectedSpeedIndex, setSelectedSpeedIndex] = useState<number>(DEFAULT_SPEED_INDEX);
  const speedIndexRef = useRef<number>(DEFAULT_SPEED_INDEX);
  const [buttonText, setButtonText] = useState("Check All ✔");

  /**
   * Validates the user's input values against the correct step values for a given sorting step.
   * Checks the current step's user input values against the expected values and updates the
   * cell validation state. It accounts for merge ranges in the case of MergeSort.
   *
   * @param {number} currentStep - The index of the current step in the sorting process.
   */
  const validateLine = useCallback(
    (currentStep: number) => {
      if (currentStep >= processList.length) return;

      const correctValues = processList[currentStep];
      const userValues = inputCellValues[currentStep];
      const currentmergeRanges = mergeRanges ? mergeRanges[currentStep] : [-1, -1];
      const sortType = sortTypeRef.current;

      // TODO: Clean up this code, maybe own validateMergeSortLine
      const validationResult = userValues.map((value, currentColumn) => {
        // Check if cell is in merge range
        const isInmergeRanges =
          currentmergeRanges && currentColumn >= currentmergeRanges[0] && currentColumn <= currentmergeRanges[1];

        // Check if cell is selected from selection sort
        const isSelected =
          sortType === SortTypes.SelectionSort &&
          selectionElements.length >= currentStep &&
          (currentColumn === selectionElements[currentStep - 1] || currentColumn === currentStep - 1);

        const isbubbleElements =
          (sortType === SortTypes.BubbleSort && bubbleElements[currentStep - 1] === currentColumn) ||
          bubbleElements[currentStep - 1] + 1 === currentColumn;

        if (
          (sortType === SortTypes.SelectionSort && !isSelected) ||
          (sortType === SortTypes.MergeSort && !isInmergeRanges) ||
          (sortType === SortTypes.BubbleSort && !isbubbleElements)
        ) {
          // Skip validation for unselected / unmerged cells
          return value === "" || Number(value) === correctValues[currentColumn];
        } else {
          return Number(value) === correctValues[currentColumn];
        }
      });

      setCellValidation((prev) => {
        const updated = [...prev];
        updated[currentStep] = validationResult;
        return updated;
      });

      setStep(currentStep + 1);
      currentStepRef.current = currentStep + 1;
    },
    [inputCellValues, mergeRanges, processList, sortTypeRef, setCellValidation, setStep]
  );

  const stopSolving = useCallback(() => {
    isSolvingRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [timeoutRef]);

  const handleSolveLine = useCallback(() => {
    if (isSolvingRef.current) {
      stopSolving();
      setSolveAllStatus("continue");
    }
    validateLine(step);
  }, [step, validateLine, stopSolving, setSolveAllStatus]);

  const continueSolving = useCallback(() => {
    if (!isSolvingRef.current || currentStepRef.current >= processList.length) {
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(continueSolving, SPEED_VALUES[speedIndexRef.current]);
    validateLine(currentStepRef.current);
  }, [validateLine, timeoutRef, currentStepRef, processList, speedIndexRef]);

  const handleGoNext = useCallback(() => {
    if (step >= processList.length) {
      return;
    }
    validateLine(step);
    setStep(step + 1);
  }, [step, validateLine, processList]);

  const handleGoBack = useCallback(() => {
    if (step <= 1) {
      return;
    }
    setCellValidation((prev) => {
      const updated = [...prev];
      updated[step - 1] = [];
      return updated;
    });
    setStep(step - 1);
    currentStepRef.current = step - 1;
  }, [step, setStep]);

  // Finish solving
  useEffect(() => {
    if (step >= processList.length) {
      setSolveAllStatus("solve");
      stopSolving();
    }
  }, [step, processList, setSolveAllStatus, stopSolving]);

  const handleSolveAll = useCallback(() => {
    if (step >= processList.length) {
      return;
    }
    switch (solveAllStatus) {
      case "solve":
        isSolvingRef.current = true;
        setSolveAllStatus("stop");
        currentStepRef.current = step;
        continueSolving();
        break;
      case "stop":
        stopSolving();
        setSolveAllStatus("continue");
        break;
      case "continue":
        isSolvingRef.current = true;
        setSolveAllStatus("stop");
        continueSolving();
        break;
    }
  }, [solveAllStatus, step, processList, continueSolving, stopSolving, setSolveAllStatus]);

  /**
   * Resets the state of the sorting animation to the initial state.
   * Called when the user clicks the "Try Again" button.
   */
  const handleTryAgain = useCallback(() => {
    stopSolving();
    setStep(1);
    currentStepRef.current = 1;
    setSolveAllStatus("solve");
    // Reset the input cell values to the initial values
    setInputCellValues(processList.map((step, index) => (index === 0 ? [...step] : new Array(step.length).fill(""))));
    // Reset the cell validation to null
    setCellValidation(processList.map((step) => new Array(step.length).fill(null)));
  }, [processList, setStep, setInputCellValues, setCellValidation, stopSolving, setSolveAllStatus]);

  /**
   * Called when the "back" button is pressed
   */
  //? UNUSED
  // const unsolveLine = useCallback(() => {
  //let step = processList[currentStepRef.current];

  // Reset the input cell values to the initial values (remove color etc.)
  // setCellValidation((prev) => new Array(step.length).fill(null));
  //}, [processList, setInputCellValues, setCellValidation]);

  /**
   * Changes the speed of the animation by clearing the current timeout and
   * starting a new one with the new speed.
   * @param newSpeedIndex The new speed index
   */
  const handleSpeedChange = (newSpeedIndex: number) => {
    setSelectedSpeedIndex(newSpeedIndex);
    speedIndexRef.current = newSpeedIndex;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(continueSolving, SPEED_VALUES[speedIndexRef.current]);
  };
  useEffect(() => {
    switch (solveAllStatus) {
      case "solve":
        setButtonText("Check All ✔");
        break;
      case "stop":
        setButtonText("Stop ✔");
        break;
      case "continue":
        setButtonText("Continue ✔");
        break;
    }
  }, [solveAllStatus]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) {
        if (event.key === "a" || event.key === "A") {
          handleSolveAll();
        } else if (event.key === "s" || event.key === "S") {
          handleTryAgain();
        } else if (event.key === "k" || event.key === "K") {
          handleGoNext();
        } else if (event.key === "j" || event.key === "J") {
          handleGoBack();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSolveLine, handleSolveAll, handleTryAgain]);

  if (!processList || processList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={buttonStyles["solve-speed-buttons"]} ref={highlightRefs.solveButtons}>
      <Points />
      <div style={{ fontSize: "12px", fontStyle: "italic", color: "gray" }}>
        {t("speed-info")}: x{SPEED_DISPLAY[selectedSpeedIndex]}
      </div>
      <div className={buttonStyles["speed-buttons-container"]}>
        <input
          type="range"
          min="0"
          max={SPEED_VALUES.length - 1}
          step="1"
          value={selectedSpeedIndex}
          onChange={(event) => handleSpeedChange(parseInt(event.target.value))}
        />
      </div>
      <div className={buttonStyles["arrow-button-container"]}>
        <button
          aria-label="Press [J]"
          data-tooltip="top"
          className={`${buttonStyles["arrow-button"]}`}
          onClick={handleGoBack}
        >
          ← Back
        </button>
        <button
          aria-label="Press [K]"
          data-tooltip="top"
          className={`${buttonStyles["arrow-button"]}`}
          onClick={handleGoNext}
        >
          Next →
        </button>
      </div>

      <div className={buttonStyles["solve-buttons"]}>
        <button aria-label="Press [A]" data-tooltip="top" onClick={handleSolveAll}>
          {buttonText}
        </button>
        <button
          aria-label="Press [S]"
          data-tooltip="top"
          className={buttonStyles["try-again-button"]}
          onClick={handleTryAgain}
        >
          Reset ↺
        </button>
      </div>
    </div>
  );
};

export default SolveButton;
