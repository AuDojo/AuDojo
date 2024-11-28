import Footer from "../components/homepage/Footer";
import BubblesortTutorial from "../components/sortSensei/tutorial/BubblesortTutorial";
import MergesortTutorial from "../components/sortSensei/tutorial/MergesortTutorial";
import QuicksortTutorial from "../components/sortSensei/tutorial/QuicksortTutorial";
import SelectionsortTutorial from "../components/sortSensei/tutorial/SelectionsortTutorial";
import RickRollTroll from "../components/sortSensei/tutorial/RickRollTroll";
import TutorialHeader from "../components/sortSensei/tutorial/TutorialHeader";
import TutorialSidebar from "../components/sortSensei/tutorial/TutorialSidebar";
import generalStyles from "../styles/homepage/general.module.css";
import headerStyles from "../styles/homepage/Header.module.css";

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
