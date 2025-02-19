import partitionpseudo from "@/features/tutorial/assets/quicksortpartition.png";
import quicksortPseudo from "@/features/tutorial/assets/quicksortpseudo.png";
import tutorialContent from "./TutorialContent.module.css";
const QuickSortImage = () => {
  return (
    <div className={tutorialContent["image-container"]}>
      <img src={quicksortPseudo} className={tutorialContent["image"]} alt="quicksort pseudocode" />
      <img src={partitionpseudo} className={tutorialContent["image"]} alt="partition pseudocode" />
    </div>
  );
};

export default QuickSortImage;
