import { useTableContext } from "@/features/sortSensei/components/table/context";
import { useGetPoints } from "../hooks/useGetPoints";
import styles from "./ProgressBar.module.css";

const ProgressBar = () => {
  const { cellsValidation } = useTableContext();
  const { currentPoints, totalPoints } = useGetPoints(cellsValidation);

  return (
    <div
      className={styles["progress-bar-container"]}
      aria-label={`Your Points: ${currentPoints}/${totalPoints}`}
      data-tooltip="top 200"
    >
      <meter
        min={0}
        max={totalPoints}
        low={totalPoints / 4}
        high={totalPoints / 2}
        optimum={totalPoints}
        value={currentPoints}
        className={styles["progress-bar"]}
      />
    </div>
  );
};

export default ProgressBar;
