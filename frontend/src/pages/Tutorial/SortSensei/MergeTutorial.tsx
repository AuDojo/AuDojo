import { TutorialNavigation } from "@/features/tutorial/components/navigation";
import MergesortText from "@/features/tutorial/components/tutorialContent/MergeSortText";
import MergeSortImage from "@/features/tutorial/components/tutorialContent/MergeSortImage";
import { mergeSortSteps } from "@/features/tutorial/data";
import { TutorialSidebar } from "@/features/tutorial/components";
import styles from "./SortSenseiTutorial.module.css";

const MergeTutorial = () => {
  return (
    <div className={styles["container-all"]}>
      <title>Mergesort Tutorial</title>
      <TutorialNavigation />
      <TutorialSidebar
        title="Mergesort"
        algexp={<MergesortText />}
        photo={<MergeSortImage />}
        sortsteps={mergeSortSteps}
        sortType={"mergesort"}
      />
    </div>
  );
};

export default MergeTutorial;
