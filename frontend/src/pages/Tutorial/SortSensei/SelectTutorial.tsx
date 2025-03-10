import { TutorialNavigation } from "@/features/tutorial/components/navigation";
import SelectionsortText from "@/features/tutorial/components/tutorialContent/SelectionSortText";
import SelectionSortImage from "@/features/tutorial/components/tutorialContent/SelectionSortImage";
import { selectionSortSteps } from "@/features/tutorial/data";
import { TutorialSidebar } from "@/features/tutorial/components";
import styles from "./SortSenseiTutorial.module.css";
import { TUT_SORTSENSEI_PATHS, TUT_SORTSENSEI_DEFAULTPATH } from "../utilConstants";

const SelectTutorial = () => {
  return (
    <div className={styles["container-all"]}>
      <title>Bubblesort Tutorial</title>
      <TutorialNavigation defaultpath={TUT_SORTSENSEI_DEFAULTPATH} navipath_map={TUT_SORTSENSEI_PATHS} />
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
