import { RickRollTroll, SelectionSortImage, SelectionSortText, TutorialSidebar } from "@/features/tutorial/components";
import BubbleSortImage from "@/features/tutorial/components/tutorialContent/BubbleSortImage";
import BubblesortText from "@/features/tutorial/components/tutorialContent/BubbleSortText";
import MergeSortImage from "@/features/tutorial/components/tutorialContent/MergeSortImage";
import MergesortText from "@/features/tutorial/components/tutorialContent/MergeSortText";
import QuickSortImage from "@/features/tutorial/components/tutorialContent/QuickSortImage";
import QuickSortText from "@/features/tutorial/components/tutorialContent/QuickSortText";
import { bubbleSortSteps, mergeSortSteps, quickSortSteps, selectionSortSteps } from "@/features/tutorial/data";
import { useSetTitle } from "@/hooks/useSetTitle";

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
