import mergesortPseudo from "../../../assets/pseudocode/mergeSortpseudo.png";
import mergePseudo from "../../../assets/pseudocode/mergepseudo.png";
import tutorialContent from "../../../styles/sortSensei/tutorial/TutorialContent.module.css";
import TutorialSidebar from "../../../components/sortSensei/tutorial/TutorialSidebar";
import Visualizer from "./StepVisualizer";
import { merge_steps } from "./tutorialData/mergeSortData";

const MergesortTutorial = () => {
    return (
    <div className={tutorialContent["content-container"]}>
        <div className={tutorialContent["title"]}> Anleitung zum Mergesort!</div> 

            <TutorialSidebar title="Aufklappen für Idee des Algorithmus">
                <MergesortText/>
            </TutorialSidebar>

            <TutorialSidebar title="Aufklappen für Pseudocode">
                <div className={tutorialContent["image-container"]}>
                    <img src={mergesortPseudo} className = {tutorialContent["image"]} alt="mergesort pseudocode"/>
                    <img src={mergePseudo} className = {tutorialContent["image"]} alt="merge pseudocode"/>
                </div>
            </TutorialSidebar>

            <Visualizer steps = {merge_steps} mergesort={true}/>
    </div>
    );
};

const MergesortText = () => {
    return (
        <div className={tutorialContent["text-container"]}>
            Die Idee des Algorithmus basiert auf dem Prinzip
            <span className={tutorialContent["font-highlight"]}> "divide and conquer"</span>. Dabei wird das Array wiederholt in zwei Hälften zerlegt, bis die Größe jedes Teilarrays 1 beträgt.<br/>
            Anschließend werden jeweils zwei Teilarrays betrachtet und beim Zusammensetzen sortiert.<br/><br/>

            Die Zerlegung erfolgt in O(log n) Schritten, während das Zusammensetzen O(n) erfordert. Insgesamt hat Mergesort die Laufzeit <span className={tutorialContent["font-highlight"]}> O(nlogn)</span>.
        </div>
    );
};


export default MergesortTutorial;