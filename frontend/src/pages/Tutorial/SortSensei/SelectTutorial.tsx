import { TutorialNavigation } from "@/features/tutorial/components/navigation";
import SelectionsortText from "@/features/tutorial/components/tutorialContent/SelectionSortText";
import SelectionSortImage from "@/features/tutorial/components/tutorialContent/SelectionSortImage";
import { selectionSortSteps } from "@/features/tutorial/data";
import { TutorialSidebar } from "@/features/tutorial/components";
import styles from "./SortSenseiTutorial.module.css";

const SelectTutorial = () => {
  return (
    <div className={styles["container-all"]}>
      <title>Bubblesort Tutorial</title>
      <TutorialNavigation />
      <TutorialSidebar
        algexp={<SelectionsortText />}
        photo={<SelectionSortImage />}
        sortsteps={selectionSortSteps}
        sortType={"selectionsort"}
      />
    </div>
  );
};

export default SelectTutorial;
