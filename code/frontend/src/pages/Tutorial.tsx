import { Footer } from "@components/footer";
import {
  RickRollTroll,
  SelectionSortImage,
  SelectionSortText,
  TutorialSidebar,
} from "@features/tutorial/components";
import generalStyles from "@styles/homepage/general.module.css";
import useSetTitle from "../hooks/title";
import { Header } from "@src/components/header";
import MergeSortImage from "@src/features/tutorial/components/tutorialContent/MergeSortImage";
import { bubbleSortSteps, mergeSortSteps, quickSortSteps, selectionSortSteps } from "@src/features/tutorial/data";
import MergesortText from "@src/features/tutorial/components/tutorialContent/MergeSortText";
import QuickSortImage from "@src/features/tutorial/components/tutorialContent/QuickSortImage";
import QuickSortText from "@src/features/tutorial/components/tutorialContent/QuickSortText";
import BubblesortText from "@src/features/tutorial/components/tutorialContent/BubbleSortText";
import BubbleSortImage from "@src/features/tutorial/components/tutorialContent/BubbleSortImage";

const Tutorial = () => {
  useSetTitle("Tutorial");
  return (
    <div className={generalStyles.container}>
      <Header />
      <main>
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
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Tutorial;
