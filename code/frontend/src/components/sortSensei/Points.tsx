import { useSortContext } from "../../hooks/sortContextHooks";
import styles from "../../styles/sortSensei/Points.module.css";

const Points = () => {
  const { cellValidation, step, stepsList} = useSortContext();
  

  // Flatten 2d array and filter non-null cells
  const nonNullCellCount = cellValidation
    .flat()
    .filter((value) => value !== null).length;

  // Filter correct inputs
  const currentPoints = cellValidation
    .flat()
    .filter((value) => value === true).length;

  const totalPoints = cellValidation.slice(1).flat().length;

  return (
    <div className={styles["points-container"]}>
      Points: {currentPoints}/{totalPoints}
      {
        currentPoints === 0 && step === stepsList.length && 
        (<div>
          <a href="https://www.tu-braunschweig.de/fileadmin/Redaktionsgruppen/Verwaltung/I-Amt/Formulare/exmatrikulation.pdf">
          You're Hopeless </a>
        </div>)
      }
    </div>
  );
};

export default Points;
