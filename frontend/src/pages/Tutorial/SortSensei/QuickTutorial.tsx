import { TutorialNavigation } from "@/features/tutorial/components/navigation";
import QuicksortText from "@/features/tutorial/components/tutorialContent/QuickSortText";
import QuickSortImage from "@/features/tutorial/components/tutorialContent/QuickSortImage";
import { quickSortSteps } from "@/features/tutorial/data";
import { TutorialSidebar } from "@/features/tutorial/components";
import styles from "./SortSenseiTutorial.module.css";

const QuickTutorial = () => {
  return (
    <div className={styles["container-all"]}>
      <title>Quicksort Tutorial</title>
      <TutorialNavigation />
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
