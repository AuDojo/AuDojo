import mergesortPseudo from "../../../assets/mergeSortpseudo.png";
import mergePseudo from "../../../assets/mergepseudo.png";
import tutorialContent from "../../../styles/sortSensei/tutorial/TutorialContent.module.css";
import TutorialSidebar from "../../../components/sortSensei/tutorial/TutorialSidebar";
import Visualizer from "./StepVisualizer";
import { merge_steps } from "./tutorialData/mergeSortData";

const MergesortTutorial = () => {
    return (
    <div className={tutorialContent["content-container"]}>
        <div className={tutorialContent["title"]}> Anleitung zum Mergesort!</div> 
            <TutorialSidebar title="Aufklappen für Pseudocode">
                <div className={tutorialContent["image-container"]}>
                    <img src={mergesortPseudo} className = {tutorialContent["image"]} alt="mergesort pseudocode"/>
                    <img src={mergePseudo} className = {tutorialContent["image"]} alt="merge pseudocode"/>
                </div>
            </TutorialSidebar>
            <Visualizer steps = {merge_steps}/>
    </div>
    );
};

export default MergesortTutorial;