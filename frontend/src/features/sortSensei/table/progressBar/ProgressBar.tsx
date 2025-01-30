import { useTableContext } from "@/features/sortSensei/table/context";
import { useCellValidation } from "../hooks/useCellValidation";
import styles from "./ProgressBar.module.css";

const ProgressBar = () => {
  const { cellValidation } = useTableContext();
  const { currentPoints, totalPoints } = useCellValidation(cellValidation);

  return (
    <div
      className={styles["progress-bar-container"]}
      aria-label={`Your Points: ${currentPoints}/${totalPoints}`}
      data-tooltip="top 200"
    >
      <meter
        min={0}
        max={1}
        low={0.25}
        high={0.5}
        optimum={1}
        value={currentPoints / totalPoints}
        className={styles["progress-bar"]}
      />
    </div>
  );
};

export default ProgressBar;
