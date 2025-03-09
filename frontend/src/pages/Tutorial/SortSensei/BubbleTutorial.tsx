import { TutorialSidebar } from "@/features/tutorial/components";
import { TutorialNavigation } from "@/features/tutorial/components/navigation";
import BubbleSortImage from "@/features/tutorial/components/tutorialContent/BubbleSortImage";
import BubblesortText from "@/features/tutorial/components/tutorialContent/BubbleSortText";
import { bubbleSortSteps } from "@/features/tutorial/data";
import styles from "./SortSenseiTutorial.module.css";

const BubbleTutorial = () => {
  return (
    <div className={styles["container-all"]}>
      <title>Bubblesort Tutorial</title>
      <TutorialNavigation />
      <TutorialSidebar
        algexp={<BubblesortText />}
        photo={<BubbleSortImage />}
        sortsteps={bubbleSortSteps}
        sortType={"bubblesort"}
      />
    </div>
  );
};

export default BubbleTutorial;
