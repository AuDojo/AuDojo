import {
  BubblesortTutorial,
  MergesortTutorial,
  QuicksortTutorial,
  RickRollTroll,
  SelectionsortTutorial,
  TutorialSidebar,
} from "@features/tutorial/components";
import { useSetTitle } from "@hooks/useSetTitle";
import generalStyles from "@styles/homepage/general.module.css";

const Tutorial = () => {
  useSetTitle("Tutorial");
  return (
    <div className={generalStyles.container}>
      <main>
        <RickRollTroll />
        <TutorialSidebar title="Mergesort" subtitle={false}>
          <MergesortTutorial />
        </TutorialSidebar>
        <TutorialSidebar title="Quicksort" subtitle={false}>
          <QuicksortTutorial />
        </TutorialSidebar>
        <TutorialSidebar title="Bubblesort" subtitle={false}>
          <BubblesortTutorial />
        </TutorialSidebar>
        <TutorialSidebar title="Selectionsort" subtitle={false}>
          <SelectionsortTutorial />
        </TutorialSidebar>
      </main>
    </div>
  );
};

export default Tutorial;
