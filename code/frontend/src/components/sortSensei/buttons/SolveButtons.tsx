import { SortType } from "@constants/index";
import { useButtonContext, useSortContext } from "@hooks/index";
import { useTutorialModal } from "@src/hooks/useTutorialModalContext";
import buttonStyles from "@styles/sortSensei/Button.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Points from "../Points";
import Tooltip from "../Tooltip";

const SPEED_VALUES = [5000, 4000, 2500, 1500, 1000, 500, 5];
const DEFAULT_SPEED_INDEX = 3;
const SPEED_DISPLAY = ["0.25", "0.5", "0.75", "1.0", "1.25", "1.5", "15"];

const SolveButton = () => {
  const { step, stepsList, inputCellValues, mergeRanges, sortTypeRef, setStep, setInputCellValues, setCellValidation } =
    useSortContext();
  const { refs } = useTutorialModal();

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
      if (currentStep >= stepsList.length) return;

      const correctValues = stepsList[currentStep];
      const userValues = inputCellValues[currentStep];
      const currentMergeRange = mergeRanges ? mergeRanges[currentStep] : [-1, -1];
      const sortType = sortTypeRef.current;

      // TODO: Clean up this code, maybe own validateMergeSortLine
      const validationResult = userValues.map((value, index) => {
        const isInMergeRange = currentMergeRange && index >= currentMergeRange[0] && index <= currentMergeRange[1];

        if (sortType !== SortType.MergeSort || isInMergeRange) {
          return Number(value) === correctValues[index];
        } else {
          return value === "" ? true : Number(value) === correctValues[index];
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
    [inputCellValues, mergeRanges, stepsList, sortTypeRef, setCellValidation, setStep]
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
    if (!isSolvingRef.current || currentStepRef.current >= stepsList.length) {
      return;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(continueSolving, SPEED_VALUES[speedIndexRef.current]);
    validateLine(currentStepRef.current);
  }, [validateLine, timeoutRef, currentStepRef, stepsList, speedIndexRef]);

  const handleGoNext = useCallback(() => {
    if (step >= stepsList.length) {
      return;
    }
    validateLine(step);
    setStep(step + 1);
  }, [step, validateLine, stepsList]);

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
    if (step >= stepsList.length) {
      setSolveAllStatus("solve");
      stopSolving();
    }
  }, [step, stepsList, setSolveAllStatus, stopSolving]);

  const handleSolveAll = useCallback(() => {
    if (step >= stepsList.length) {
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
  }, [solveAllStatus, step, stepsList, continueSolving, stopSolving, setSolveAllStatus]);

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
    setInputCellValues(stepsList.map((step, index) => (index === 0 ? [...step] : new Array(step.length).fill(""))));
    // Reset the cell validation to null
    setCellValidation(stepsList.map((step) => new Array(step.length).fill(null)));
  }, [stepsList, setStep, setInputCellValues, setCellValidation, stopSolving, setSolveAllStatus]);

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
        } else if (event.key === "l" || event.key === "L") {
          handleSolveLine();
        } else if (event.key === "s" || event.key === "S") {
          handleTryAgain();
        } else if (event.key === "p" || event.key === "P") {
          handleGoBack();
        } else if (event.key === "n" || event.key === "N") {
          handleGoNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSolveLine, handleSolveAll, handleTryAgain]);

  if (!stepsList || stepsList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={buttonStyles["solve-speed-buttons"]} ref={refs.solveButtons}>
      <Points />
      <div style={{ fontSize: "12px", fontStyle: "italic", color: "gray" }}>
        Current speed: x{SPEED_DISPLAY[selectedSpeedIndex]}
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
        <Tooltip direction="top" content="P">
          <button className={buttonStyles["arrow-button"]} onClick={handleGoBack}>
            &larr;
          </button>
        </Tooltip>
        <Tooltip direction="top" content="N">
          <button className={buttonStyles["arrow-button"]} onClick={handleGoNext}>
            &rarr;
          </button>
        </Tooltip>
      </div>

      <div className={buttonStyles["solve-buttons"]}>
        <Tooltip direction="right" content="A">
          <button onClick={handleSolveAll}>{buttonText}</button>
        </Tooltip>
        <Tooltip direction="right" content="S">
          <button className={buttonStyles["try-again-button"]} onClick={handleTryAgain}>
            Reset ↺
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default SolveButton;
