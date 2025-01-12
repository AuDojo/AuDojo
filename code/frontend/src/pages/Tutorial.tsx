import {
  BubblesortTutorial,
  MergesortTutorial,
  QuicksortTutorial,
  RickRollTroll,
  SelectionsortTutorial,
  TutorialSidebar,
} from "@features/tutorial/components";
import { useSetTitle } from "@hooks/useSetTitle";

const Tutorial = () => {
  useSetTitle("Tutorial");
  return (
    <>
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
    </>
  );
};

export default Tutorial;
