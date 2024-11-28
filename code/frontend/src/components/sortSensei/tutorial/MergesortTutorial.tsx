import mergesortPseudo from "../../../assets/mergeSortpseudo.png";
import mergePseudo from "../../../assets/mergepseudo.png";
import tutorialContent from "../../../styles/sortSensei/tutorial/TutorialContent.module.css";
import TutorialSidebar from "../../../components/sortSensei/tutorial/TutorialSidebar";
import Visualizer from "./StepVisualizer";

const MergesortTutorial = () => {
    return (
    <div className={tutorialContent["content-container"]}> 
        <h1>Beispiele zum Mergesort!</h1>
            <TutorialSidebar title="Aufklappen für Pseudocode">
                <div className={tutorialContent["image-container"]}>
                    <img src={mergesortPseudo} className = {tutorialContent["image"]} alt="mergesort pseudocode"/>
                    <img src={mergePseudo} className = {tutorialContent["image"]} alt="merge pseudocode"/>
                </div>
            </TutorialSidebar>
            <Visualizer/>
    </div>
    
        
        );
};

export default MergesortTutorial;