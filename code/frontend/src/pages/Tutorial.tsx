import { Footer } from "@components/homepage";
import {
  BubblesortTutorial,
  MergesortTutorial,
  QuicksortTutorial,
  RickRollTroll,
  SelectionsortTutorial,
  TutorialHeader,
  TutorialSidebar,
} from "@components/sortSensei/tutorial";
import generalStyles from "@styles/homepage/general.module.css";
import headerStyles from "@styles/homepage/Header.module.css";

const Tutorial = () => {
  return (
    <div className={generalStyles.container}>
      <header className={headerStyles.header}>
        <TutorialHeader />
      </header>
      <main>
        <RickRollTroll />
        <TutorialSidebar title="Mergesort">
          <MergesortTutorial />
        </TutorialSidebar>
        <TutorialSidebar title="Quicksort">
          <QuicksortTutorial />
        </TutorialSidebar>
        <TutorialSidebar title="Bubblesort">
          <BubblesortTutorial />
        </TutorialSidebar>
        <TutorialSidebar title="Selectionsort">
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
