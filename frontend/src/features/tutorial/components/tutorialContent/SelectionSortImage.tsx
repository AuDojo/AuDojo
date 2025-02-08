import selectionPseudo from "@/features/tutorial/assets/selectionsortpseudo.jpg";
import tutorialContent from "./TutorialContent.module.css";

const SelectionSortImage = () => {
  return (
    <div className={tutorialContent["image-container"]}>
      <img src={selectionPseudo} className={tutorialContent["image"]} alt="selectionsort pseudocode" />
    </div>
  );
};

export default SelectionSortImage;
