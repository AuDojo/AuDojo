import { useSortContext } from "../../hooks/sortContextHooks";
import vizStyles from "../../styles/sortSensei/SortVisualizer.module.css";
const SortVisualizer = () => {
  const { stepsList, step } = useSortContext();
  const currentStep = stepsList[step - 1] || [];
  const maxNumber = Math.max(...currentStep);
  
  // Determine the scale based on maxNumber
  let scaleFactor;
  if (maxNumber <= 10) {
    scaleFactor = 15;
  } else if (maxNumber <= 20) {
    scaleFactor = 10;
  } else if (maxNumber <= 30) {
    scaleFactor = 7;
  } else{
    scaleFactor = 5;
  }


  return (
    <div className={vizStyles["viz-container"]}>
      {stepsList.length > 0 &&
        stepsList[step - 1] &&
        stepsList[step - 1].map((number, index) => (
          <div key={index} className={vizStyles["bar-container"]}>
            <div className={vizStyles["bar"]} style={{ height: `${number * scaleFactor}px` }}></div>
            <div>{number}</div>
          </div>
        ))}
    </div>
  );
};

export default SortVisualizer;
