import { useSortContext } from "../../hooks/sortContextHooks";
import vizStyles from "../../styles/sortSensei/SortVisualizer.module.css";
const SortVisualizer = () => {
  const { stepsList, step } = useSortContext();

  return (
    <div className={vizStyles["viz-container"]}>
      {stepsList.length > 0 &&
        stepsList[step - 1] &&
        stepsList[step - 1].map((number, index) => (
          <div key={index} className={vizStyles["bar-container"]}>
            <div className={vizStyles["bar"]} style={{ height: `${number * 5}px` }}></div>
            <div>{number}</div>
          </div>
        ))}
    </div>
  );
};

export default SortVisualizer;
