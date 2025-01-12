import { RickRollTroll, SelectionSortImage, SelectionSortText, TutorialSidebar } from "@features/tutorial/components";
import { useSetTitle } from "@/hooks";
import MergeSortImage from "@/features/tutorial/components/tutorialContent/MergeSortImage";
import { bubbleSortSteps, mergeSortSteps, quickSortSteps, selectionSortSteps } from "@/features/tutorial/data";
import MergesortText from "@/features/tutorial/components/tutorialContent/MergeSortText";
import QuickSortImage from "@/features/tutorial/components/tutorialContent/QuickSortImage";
import QuickSortText from "@/features/tutorial/components/tutorialContent/QuickSortText";
import BubblesortText from "@/features/tutorial/components/tutorialContent/BubbleSortText";
import BubbleSortImage from "@/features/tutorial/components/tutorialContent/BubbleSortImage";

const Tutorial = () => {
  useSetTitle("Tutorial");
  return (
    <>
      <RickRollTroll />

      <TutorialSidebar
        title="Mergesort"
        algexp={<MergesortText />}
        photo={<MergeSortImage />}
        sortsteps={mergeSortSteps}
        sortType={"mergesort"}
      />

      <TutorialSidebar
        title="QuickSort"
        algexp={<QuickSortText />}
        photo={<QuickSortImage />}
        sortsteps={quickSortSteps}
        sortType={"quicksort"}
      />

      <TutorialSidebar
        title="BubbleSort"
        algexp={<BubblesortText />}
        photo={<BubbleSortImage />}
        sortsteps={bubbleSortSteps}
        sortType={"bubblesort"}
      />

      <TutorialSidebar
        title="SelectionSort"
        algexp={<SelectionSortText />}
        photo={<SelectionSortImage />}
        sortsteps={selectionSortSteps}
        sortType={"selectionsort"}
      />
    </>
  );
};

export default Tutorial;
