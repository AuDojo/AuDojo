import { useSortContext } from "../../hooks/sortContextHooks";
import buttonStyles from "../../styles/sortSensei/Button.module.css";
import { useState, useRef, useEffect } from "react";

const DEFAULT_SPEED = 1.0;
const BASE_TIMEOUT = 1000; // 1 second base timeout
const SPEED_VALUES = ["0.4", "0.7", "1.0", "2.0"];

const SolveButton = () => {
  const { step, stepsList, inputCellValues, mergeRanges, setStep, setInputCellValues, setCellValidation } =
    useSortContext();

  const [selectedSpeed, setSelectedSpeed] = useState(DEFAULT_SPEED);
  const [solveAllStatus, setSolveAllStatus] = useState<"solve" | "stop" | "continue">("solve");
  const isSolvingRef = useRef<boolean>(false);
  const currentStepRef = useRef<number>(step);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const speedRef = useRef<number>(DEFAULT_SPEED);

  // Convert speed multiplier to actual timeout (e.g., 2.0 -> 500ms, 0.5 -> 2000ms)
  const getTimeoutFromSpeed = (multiplier: number) => BASE_TIMEOUT / multiplier;

  const validateLine = (currentStep: number) => {
    if (currentStep < stepsList.length) {
      const correctValues = stepsList[currentStep];
      const userValues = inputCellValues[currentStep];
      const currentMergeRange = mergeRanges[currentStep];

      const validationResult = userValues.map((value, index) => {
        const isInMergeRange = index >= currentMergeRange[0] && index <= currentMergeRange[1];

        if (isInMergeRange) {
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
    }
  };

  const handleSolveLine = () => {
    if (isSolvingRef.current) {
      stopSolving();
      setSolveAllStatus("continue");
    }
    validateLine(step);
  };

  const stopSolving = () => {
    isSolvingRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const solveNextStep = () => {
    if (!isSolvingRef.current || currentStepRef.current >= stepsList.length) {
      if (currentStepRef.current >= stepsList.length) {
        setSolveAllStatus("solve");
        isSolvingRef.current = false;
      }
      return;
    }

    validateLine(currentStepRef.current);

    if (currentStepRef.current < stepsList.length && isSolvingRef.current) {
      const currentTimeout = getTimeoutFromSpeed(speedRef.current);
      timeoutRef.current = setTimeout(solveNextStep, currentTimeout);
    }
  };

  const handleSolveAll = () => {
    switch (solveAllStatus) {
      case "solve":
        isSolvingRef.current = true;
        setSolveAllStatus("stop");
        currentStepRef.current = step;
        solveNextStep();
        break;
      case "stop":
        stopSolving();
        setSolveAllStatus("continue");
        break;
      case "continue":
        isSolvingRef.current = true;
        setSolveAllStatus("stop");
        solveNextStep();
        break;
    }
  };

  const handleTryAgain = () => {
    stopSolving();
    setStep(1);
    currentStepRef.current = 1;
    setSolveAllStatus("solve");
    speedRef.current = DEFAULT_SPEED;
    setInputCellValues(stepsList.map((step) => new Array(step.length).fill("")));
    setCellValidation(stepsList.map((step) => new Array(step.length).fill(null)));
  };

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

  const getSolveAllButtonText = () => {
    switch (solveAllStatus) {
      case "solve":
        return "Solve All";
      case "stop":
        return "Stop";
      case "continue":
        return "Continue";
    }
  };

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
        <button onClick={handleSolveAll}>{getSolveAllButtonText()} (L)</button>
        <button onClick={handleSolveLine}>Solve Line (l)</button>
        <button onClick={handleTryAgain}>Try Again (t)</button>
      </div>
    </div>
  );
};

export default SolveButton;
