import selectionPseudo from "../../../assets/pseudocode/selectionsortpseudo.jpg";
import tutorialContent from "../../../styles/sortSensei/tutorial/TutorialContent.module.css";
import TutorialSidebar from "../../../components/sortSensei/tutorial/TutorialSidebar";
import Visualizer from "./StepVisualizer";
import { selection_steps } from "./tutorialData/selectionSortData";

const SelectionsortTutorial = () => {
  return (
    <div className={tutorialContent["content-container"]}>

        <div className={tutorialContent["title"]}> Anleitung zum Selectionsort!</div>
            
            <TutorialSidebar title="Aufklappen für Idee des Algorithmus">
                <SelectionsortText/>
            </TutorialSidebar>

            <TutorialSidebar title="Aufklappen für Pseudocode">
                <div className={tutorialContent["image-container"]}>
                    <img src={selectionPseudo} className = {tutorialContent["image"]} alt="selectionsort pseudocode"/>
                </div>
            </TutorialSidebar>

            <Visualizer steps = {selection_steps} mergesort={false}/>
    </div>
    );
};


const SelectionsortText = () => {
    return (
        <div className={tutorialContent["text-container"]}>
            Der Algorithmus ist <span className={tutorialContent["font-highlight"]}> iterativ</span>. Die Idee ist, dass wir kleinstes Element in (Teil)array ganz am links von diesem Array verschieben. Der betrachtete Array wird sich um 1 Element verkleinern. Das Ergebnis wird es so, dass das kleinste Element ganzes Arrays ganz link stehen, und nächstkleinstes rechts von dem, und so weiter<br/><br/>

            In jedem Teilarray wird das kleinste Element gesucht. Das Suchen von solchem Element beträgt O(n) und wir haben O(n) viele Teilarray. Die Laufzeit ist insgesamt <span className={tutorialContent["font-highlight"]}> O(n^2)</span>.
        </div>
    );
};


export default SelectionsortTutorial;
