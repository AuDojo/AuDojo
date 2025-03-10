import { TutorialNavigation } from "@/features/tutorial/components/navigation";
import QuicksortText from "@/features/tutorial/components/tutorialContent/QuickSortText";
import QuickSortImage from "@/features/tutorial/components/tutorialContent/QuickSortImage";
import { quickSortSteps } from "@/features/tutorial/data";
import { TutorialSidebar } from "@/features/tutorial/components";
import styles from "./SortSenseiTutorial.module.css";
import { TUT_SORTSENSEI_PATHS, TUT_SORTSENSEI_DEFAULTPATH } from "../utilConstants";

const QuickTutorial = () => {
  return (
    <div className={styles["container-all"]}>
      <title>Quicksort Tutorial</title>
      <TutorialNavigation defaultpath={TUT_SORTSENSEI_DEFAULTPATH} navipath_map={TUT_SORTSENSEI_PATHS} />
      <TutorialSidebar
        algexp={<QuicksortText />}
        photo={<QuickSortImage />}
        sortsteps={quickSortSteps}
        sortType={"quicksort"}
      />
    </div>
  );
};

export default QuickTutorial;
