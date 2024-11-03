import { useSortContext } from "../../hooks/sortContextHooks";
import buttonStyles from "../../styles/sortSensei/Button.module.css";
const SolveButton = () => {
  const { setStep, step, stepsList } = useSortContext();

  const handleSolveLine = () => {
    if (step < stepsList.length) {
      setStep(step + 1);
    }
  };

  const handleSolveAll = () => {
    setStep(stepsList.length);
  };

  const handleTryAgain = () => {
    setStep(1);
  };

  return (
    <div className={buttonStyles["solve-button"]}>
      <button onClick={handleSolveAll}>Solve All</button>
      <button onClick={handleSolveLine}>Solve Line</button>
      <button onClick={handleTryAgain}>Try Again</button>
    </div>
  );
};

export default SolveButton;
