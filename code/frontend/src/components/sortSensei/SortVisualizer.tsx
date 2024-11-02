import { useEffect } from "react";
import { useSortContext } from "../../contexts/SortContext";
import vizStyles from "../../styles/sortSensei/SortVisualizer.module.css";
const SortVisualizer = () => {
  const { stepsList } = useSortContext();

  useEffect(() => {
    if (stepsList.length > 0) {
      console.log(stepsList);
    }
  }, [stepsList]);

  return (
    <div className={vizStyles["viz-container"]}>
      {stepsList.length > 0 &&
        stepsList[0] &&
        stepsList[0].map((number, index) => (
          <div key={index} className={vizStyles["bar-container"]}>
            <div className={vizStyles["bar"]}
            style={{ height: `${number*5}px` }}></div>
            <div>{number}</div>
          </div>
        ))}
    </div>
  );
};

export default SortVisualizer;
