import mergesortPseudo from "@features/tutorial/assets/mergeSortpseudo.png";
import mergePseudo from "@features/tutorial/assets/mergepseudo.png";
import tutorialContent from "./TutorialContent.module.css";

const MergeSortImage = () => {
  return (
    <div className={tutorialContent["image-container"]}>
      <img src={mergesortPseudo} className={tutorialContent["image"]} alt="mergesort pseudocode" />

      <img src={mergePseudo} className={tutorialContent["image"]} alt="merge pseudocode" />
    </div>
  );
};

export default MergeSortImage;
