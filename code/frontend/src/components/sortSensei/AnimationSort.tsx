import animationStyles from "../../styles/sortSensei/AnimationSort.module.css";
import { useState } from "react";
import SortVisualizer from "./SortVisualizer";
const AnimationSort = () => {
  const [isPseudocodeVisible, setPseudocodeVisible] = useState(false);

  const togglePseudocode = () => {
    setPseudocodeVisible(!isPseudocodeVisible);
  };

  return (
    <>
      <div className={`${animationStyles["animation-container"]} ${!isPseudocodeVisible ? "" : animationStyles["move-left"]}`}>
        <SortVisualizer />
      </div>
      <div className={`${animationStyles["pseudocode-container"]} ${isPseudocodeVisible ? "" : animationStyles["hidden"]}`}></div>
      <button className={animationStyles["side-button"]} onClick={togglePseudocode}>
        {isPseudocodeVisible ? "CLOSE" : "OPEN Pseudocode"}
      </button>
    </>
  );
};

export default AnimationSort;
