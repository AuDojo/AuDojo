import { useSortContext } from "../../hooks/sortContextHooks";
import buttonStyles from "../../styles/sortSensei/Button.module.css";

const SolveButton = () => {
  const {
    step,
    stepsList,
    inputCellValues,
    mergeRanges,
    setStep,
    setInputCellValues,
    setCellValidation,
  } = useSortContext();

  const validateLine = (currentStep: number) => {
    if (currentStep < stepsList.length) {
      const correctValues = stepsList[currentStep];
      const userValues = inputCellValues[currentStep];
      const currentMergeRange = mergeRanges[currentStep];

      // Validate the user input
      const validationResult = userValues.map((value, index) => {
        const isInMergeRange =
          index >= currentMergeRange[0] && index <= currentMergeRange[1];

        if (isInMergeRange) {
          return Number(value) === correctValues[index];
        } else {
          return value === "" ? true : Number(value) === correctValues[index];
        }
      });

      // Update validation state
      setCellValidation((prev) => {
        const updated = [...prev];
        updated[currentStep] = validationResult;
        return updated;
      });

      setStep(currentStep + 1);
    }
  };

  const handleSolveLine = () => {
    validateLine(step);
  };

  // TODO: Set Time Intervals for Solve All Lines
  const handleSolveAll = () => {
    for (
      let currentStep = step;
      currentStep < stepsList.length;
      currentStep++
    ) {
      validateLine(currentStep);
    }
  };

  const handleTryAgain = () => {
    setStep(1);

    // Reset states
    setInputCellValues(
      stepsList.map((step) => new Array(step.length).fill(""))
    );
    setCellValidation(
      stepsList.map((step) => new Array(step.length).fill(null))
    );
  };

  return (
    <div className={buttonStyles["solve-buttons"]}>
      <button onClick={handleSolveAll}>Solve All</button>
      <button onClick={handleSolveLine}>Solve Line</button>
      <button onClick={handleTryAgain}>Try Again</button>
    </div>
  );
};

export default SolveButton;
