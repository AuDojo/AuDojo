import { useTableContext } from "@/features/sortSensei/table/context";
import styles from "./Points.module.css";

const Points = () => {
  const { cellValidation } = useTableContext();
  // Filter correct inputs
  const currentPoints = cellValidation.flat().filter((value) => value === true).length;

  // Filter total amount of points
  const totalPoints = cellValidation.slice(1).flat().length;

  return (
    <div className={styles["progress-bar-container"]}>
      <meter value={currentPoints / totalPoints} className={styles["progress-bar"]} />
    </div>
  );
};

export default Points;
