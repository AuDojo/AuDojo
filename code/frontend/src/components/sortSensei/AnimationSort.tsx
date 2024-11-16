import animationStyles from "../../styles/sortSensei/AnimationSort.module.css";
import buttonStyles from "../../styles/sortSensei/Button.module.css";
import { useState } from "react";
import SortVisualizer from "./SortVisualizer";
import { Link } from "react-router-dom";
import D3SortVisualizer from "./D3SortVisualizer";

const AnimationSort = () => {
  const [isPseudocodeVisible, setPseudocodeVisible] = useState(false);

  const togglePseudocode = () => {
    setPseudocodeVisible(!isPseudocodeVisible);
  };

  return (
    <>
      <div
        className={`${animationStyles["animation-container"]} ${animationStyles["viz-container"]} ${
          !isPseudocodeVisible ? "" : animationStyles["move-left"]
        }`}
      >
        {/* <SortVisualizer /> */}
        <D3SortVisualizer />
      </div>
      <div
        className={`${animationStyles["pseudocode-container"]} ${isPseudocodeVisible ? "" : animationStyles["hidden"]}`}
      >
        <div className="">
          <Link className="Link" to="/tutorial">
            {" "}
            Find More about Algorithm
          </Link>
        </div>
      </div>
      <button className={buttonStyles["pseudo-button"]} onClick={togglePseudocode}>
        {isPseudocodeVisible ? "CLOSE" : "Show pseudocode"}
      </button>
    </>
  );
};

export default AnimationSort;
