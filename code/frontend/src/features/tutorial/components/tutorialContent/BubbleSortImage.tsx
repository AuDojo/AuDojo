import bubblesortPseudo from "@features/tutorial/assets/bubblesortpseudo.png";
import tutorialContent from "./TutorialContent.module.css";

const BubbleSortImage = () => {
    return (
      <div className={tutorialContent["image-container"]}>
        <img src={bubblesortPseudo} className={tutorialContent["image"]} alt="bubblesort pseudocode" />
      </div>
    );
}

export default BubbleSortImage;