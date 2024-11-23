import { useEffect, useRef, useState, useCallback } from "react";
import { SortType } from "../../constants";
import { useSortContext } from "../../hooks/sortContextHooks";
import buttonStyles from "../../styles/sortSensei/Button.module.css";

const DEFAULT_SPEED = 1.0;
const BASE_TIMEOUT = 1000; // 1 second base timeout
const SPEED_VALUES = ["0.4", "0.7", "1.0", "2.0"];

// Convert speed multiplier to actual timeout (e.g., 2.0 -> 500ms, 0.5 -> 2000ms)
const getTimeoutFromSpeed = (multiplier: number) => BASE_TIMEOUT / multiplier;

const SolveButton = () => {
  const { step, stepsList, inputCellValues, mergeRanges, sortTypeRef, setStep, setInputCellValues, setCellValidation } =
    useSortContext();

  const [selectedSpeed, setSelectedSpeed] = useState(DEFAULT_SPEED);
  const [solveAllStatus, setSolveAllStatus] = useState<"solve" | "stop" | "continue">("solve");
  const isSolvingRef = useRef<boolean>(false);
  const currentStepRef = useRef<number>(step);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const speedRef = useRef<number>(DEFAULT_SPEED);
  const [buttonText, setButtonText] = useState("Sort All");

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
  const handleSolveLine = useCallback(() => {
    if (isSolvingRef.current) {
      stopSolving();
      setSolveAllStatus("continue");
      setButtonText("Continue");
    }
    validateLine(step);
  }, [step, validateLine]);

  const stopSolving = () => {
    isSolvingRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const solveNextStep = useCallback(() => {
    if (!isSolvingRef.current || step >= stepsList.length) {
      if (currentStepRef.current >= stepsList.length - 1) {
        isSolvingRef.current = false;
        setSolveAllStatus("solve");
        setButtonText("Sort All");
      }
      return;
    }
    validateLine(currentStepRef.current);

    if (currentStepRef.current < stepsList.length && isSolvingRef.current) {
      const currentTimeout = getTimeoutFromSpeed(speedRef.current);
      timeoutRef.current = setTimeout(solveNextStep, currentTimeout);
    }
  }, [stepsList, validateLine, step]);

  useEffect(() => {
    if (step >= stepsList.length) {
      setSolveAllStatus("solve");
      setButtonText("Sort All");
    }
  }, [step, stepsList]);

  const handleSolveAll = useCallback(() => {
    switch (solveAllStatus) {
      case "solve":
        isSolvingRef.current = true;
        setSolveAllStatus("stop");
        setButtonText("Stop");
        currentStepRef.current = step;
        solveNextStep();
        break;
      case "stop":
        stopSolving();
        setSolveAllStatus("continue");
        setButtonText("Continue");
        break;
      case "continue":
        isSolvingRef.current = true;
        setSolveAllStatus("stop");
        setButtonText("Stop");
        solveNextStep();
        break;
    }
  }, [solveAllStatus, step, solveNextStep]);

  const handleTryAgain = useCallback(() => {
    stopSolving();
    setStep(1);
    currentStepRef.current = 1;
    setSolveAllStatus("solve");
    setButtonText("Sort All");
    setInputCellValues(stepsList.map((step) => new Array(step.length).fill("")));
    setCellValidation(stepsList.map((step) => new Array(step.length).fill(null)));
  }, [stepsList, setStep, setInputCellValues, setCellValidation]);

  const handleSpeedChange = (newSpeed: number) => {
    setSelectedSpeed(newSpeed);
    speedRef.current = newSpeed;

    if (isSolvingRef.current) {
      // Clear current timeout and restart with new speed
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(solveNextStep, getTimeoutFromSpeed(newSpeed));
    }
  };

  // const getSolveAllButtonText = () => {
  //   switch (solveAllStatus) {
  //     case "solve":
  //       return "Sort All";
  //     case "stop":
  //       return "Stop";
  //     case "continue":
  //       return "Continue";
  //   }
  // };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "l") {
        handleSolveLine();
      } else if (event.key === "L") {
        handleSolveAll();
      } else if (event.key === "t") {
        handleTryAgain();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSolveLine, handleSolveAll, handleTryAgain]);

  return (
    <div className={buttonStyles["solve-speed-buttons"]}>
      <div className={buttonStyles["speed-buttons-container"]}>
        {SPEED_VALUES.map((speedValue) => (
          <button
            key={speedValue}
            onClick={() => handleSpeedChange(parseFloat(speedValue))}
            className={`${parseFloat(speedValue) === selectedSpeed ? buttonStyles["selected-speed"] : ""}`}
          >
            x{speedValue}
          </button>
        ))}
      </div>
      <div className={buttonStyles["solve-buttons"]}>
        <button onClick={handleSolveAll}>{buttonText} (L)</button>
        <button onClick={handleSolveLine}>Sort Line (l)</button>
        <button onClick={handleTryAgain}>Try Again (t)</button>
      </div>
    </div>
  );
};

export default SolveButton;
