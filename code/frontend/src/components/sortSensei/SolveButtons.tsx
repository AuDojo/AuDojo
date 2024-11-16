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

  const handleSolveLine = () => {
    if (step < stepsList.length) {
      const correctValues = stepsList[step];
      const userValues = inputCellValues[step];
      const currentMergeRange = mergeRanges[step];

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
        updated[step] = validationResult;
        return updated;
      });

      // Move to next step
      setStep(step + 1);
    }
  };

  const handleSolveAll = () => {
    setStep(stepsList.length);
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
