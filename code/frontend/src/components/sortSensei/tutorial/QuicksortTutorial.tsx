import quicksortPseudo from "@assets/pseudocode/quicksortpseudo.png";
import partitionpseudo from "@assets/pseudocode/quicksortpartition.png";
import tutorialContent from "@styles/sortSensei/tutorial/TutorialContent.module.css";
import {StepVisualizer,TutorialSidebar} from "./";
import { quick_steps } from "./tutorialData/quickSortData";
import quicksortidee from "@assets/quicksortidee.png";

const QuicksortTutorial = () => {
  return (
    <div className={tutorialContent["content-container"]}>

        <div className={tutorialContent["title"]}> Anleitung zum Quicksort!</div> 

            <TutorialSidebar title="Aufklappen für Idee des Algorithmus">
                <QuicksortText/>
            </TutorialSidebar>

            <TutorialSidebar title="Aufklappen für Pseudocode">
                <div className={tutorialContent["image-container"]}>
                    <img src={quicksortPseudo} className = {tutorialContent["image"]} alt="quicksort pseudocode"/>
                    <img src={partitionpseudo} className = {tutorialContent["image"]} alt="partition pseudocode"/>
                </div>
            </TutorialSidebar>

            <StepVisualizer steps = {quick_steps} mergesort={false}/>

    </div>
    );
};

const QuicksortText = () => {
    return (
        <div className={tutorialContent["text-container"]}>
            Die Idee des Algorithmus basiert auf dem Prinzip <span className={tutorialContent["font-highlight"]}> "divide and conquer"</span>.
            Der Array wird in zwei aufgeteilt, ein Teilarray, deren Werte kleiner als Pivotelement sind und anderer, deren Werte größer als das Pivotelement sind. Das wird wiederholt, bis der Array nicht mehr zerlegbar ist. Der Auswahl von Pivotelement ist in unserem Fall letztes Element betrachtetes Arrays.
            <br/><br/>

            <div className={tutorialContent["image-container"]}>
            <img src={quicksortidee} className = {tutorialContent["image"]} alt="quicksort idee"/>
            </div>

            Die Laufzeit ist abhängig von dem Wahl des Pivotelements. Falls Pivotelement so gewählt wird, dass das Pivotelement nach Parititionalgorithmus in der Mitte vom Array liegt, funktioniert die Zerlegung wie Mergesort, dass der Array in zwei aufgeteilt wird. In dem Fall beträgt die Laufzeit <span className={tutorialContent["font-highlight"]}> O(nlogn)</span>. Das ist auch durchschnittliche Laufzeit. Die Laufzeit kann schlimmstenfall <span className={tutorialContent["font-highlight"]}> O(n^2)</span> betragen, falls das Pivotelement das größte/kleinste Element in dem Array gewählt wird. 
        </div>
    );
};

export default QuicksortTutorial;
