import bubblesortPseudo from "@assets/pseudocode/bubblesortpseudo.png";
import tutorialContent from "@styles/sortSensei/tutorial/TutorialContent.module.css";
import { StepVisualizer, TutorialSidebar } from "./";
import { bubble_steps } from "./tutorialData/bubbleSortData";

const BubblesortTutorial = () => {
  return (
    <div className={tutorialContent["content-container"]}>

        <div className={tutorialContent["title"]}> Anleitung zum Bubblesort!</div> 
            
            <TutorialSidebar title="Aufklappen für Idee des Algorithmus">
                <BubblesortText/>
            </TutorialSidebar>

            <TutorialSidebar title="Aufklappen für Pseudocode">
                <div className={tutorialContent["image-container"]}>
                    <img src={bubblesortPseudo} className = {tutorialContent["image"]} alt="bubblesort pseudocode"/>
                </div>
            </TutorialSidebar>

            <StepVisualizer steps = {bubble_steps} mergesort={false}/>
    </div>
    );
};


const BubblesortText = () => {
    return (
        <div className={tutorialContent["text-container"]}>
             Der Algorithmus ist <span className={tutorialContent["font-highlight"]}> iterativ</span>. Die Idee ist, dass wir immer das größere Element mit dessen Nachbar tauschen und nach rechts verschieben. Nach der Iteration wird der Endindex um eins verringert. Nach der ersten Iteration wird sich ergeben, dass das größte Element ganzes Arrays ganz am rechts stehen. Nächste Iteration wird das nächstgrößte Element links von dem Element verschoben.<br/><br/>
             
            O(n) viele Elemente werden in einer Iteration getauscht. Die Anzahl der Iteration ist die Länge des Arrays - 1 also auch O(n). Insgesamt beträgt die Laufzeit<span className={tutorialContent["font-highlight"]}> O(n^2)</span>.
        </div>
    );
};


export default BubblesortTutorial;
