import Footer from "../components/homepage/Footer";
import TutorialHeader from "../components/sortSensei/TutorialHeader";
import generalStyles from "../styles/homepage/general.module.css";
import headerStyles from "../styles/homepage/Header.module.css";
import TutorialSidebar from "../components/sortSensei/TutorialSidebar";
import MergesortTutorial from "../components/sortSensei/MergesortTutorial";
import BubblesortTutorial from "../components/sortSensei/BubblesortTutorial";
import QuicksortTutorial from "../components/sortSensei/QuicksortTutorial";
import SelectionsortTutorial from "../components/sortSensei/SelectionsortTutorial";


const Tutorial = () => {
    return (
    <div className={generalStyles.container}>
      <header className={headerStyles.header}><TutorialHeader /></header>
      <main>
        <TutorialSidebar title="Mergesort"><MergesortTutorial/></TutorialSidebar>
        <TutorialSidebar title="Quicksort"><QuicksortTutorial/></TutorialSidebar>
        <TutorialSidebar title="Bubblesort"><BubblesortTutorial/></TutorialSidebar>
        <TutorialSidebar title="Selectionsort"><SelectionsortTutorial/></TutorialSidebar>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
    );
};

export default Tutorial;