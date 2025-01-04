import { Footer } from "@components/footer";
import {
  BubblesortTutorial,
  MergesortTutorial,
  QuicksortTutorial,
  RickRollTroll,
  SelectionsortTutorial,
  TutorialSidebar,
} from "@features/tutorial/components";
import { useSetTitle } from "@hooks/useSetTitle";
import { Header } from "@src/components/header";
import generalStyles from "@styles/homepage/general.module.css";

const Tutorial = () => {
  useSetTitle("Tutorial");
  return (
    <div className={generalStyles.container}>
      <Header />
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
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Tutorial;
