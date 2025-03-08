import { TutorialNavigation } from "@/features/tutorial/components/navigation";
import BubblesortText from "@/features/tutorial/components/tutorialContent/BubbleSortText";
import BubbleSortImage from "@/features/tutorial/components/tutorialContent/BubbleSortImage";
import { bubbleSortSteps } from "@/features/tutorial/data";
import { TutorialSidebar } from "@/features/tutorial/components";
import styles from "./SortSenseiTutorial.module.css";

const BubbleTutorial = () => {
  return (
    <div className={styles["container-all"]}>
      <title>Bubblesort Tutorial</title>
      <TutorialNavigation />
      <TutorialSidebar
        title="Bubblesort Tutorial"
        algexp={<BubblesortText />}
        photo={<BubbleSortImage />}
        sortsteps={bubbleSortSteps}
        sortType={"bubblesort"}
      />
    </div>
  );
};

export default BubbleTutorial;
