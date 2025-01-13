import { useSortContext } from "@/features/sortSensei/context/SortContext";
import { useTableContext } from "../table/context/TableContext";
import styles from "./Points.module.css";

const Points = () => {
  const { step, processList } = useSortContext();
  const { cellValidation } = useTableContext();
  // Filter correct inputs
  const currentPoints = cellValidation.flat().filter((value) => value === true).length;

  const totalPoints = cellValidation.slice(1).flat().length;

  return (
    <div className={styles["points-container"]}>
      Points: {currentPoints}/{totalPoints}
      {currentPoints === 0 && step === processList.length && (
        <div>
          <a href="https://www.tu-braunschweig.de/fileadmin/Redaktionsgruppen/Verwaltung/I-Amt/Formulare/exmatrikulation.pdf">
            You're Hopeless{" "}
          </a>
        </div>
      )}
    </div>
  );
};

export default Points;
