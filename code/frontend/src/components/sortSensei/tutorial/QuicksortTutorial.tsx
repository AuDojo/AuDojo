import quicksortPseudo from "@assets/pseudocode/quicksortpseudo.png";
import partitionpseudo from "@assets/pseudocode/quicksortpartition.png";
import tutorialContent from "@styles/sortSensei/tutorial/TutorialContent.module.css";
import { StepVisualizer, TutorialSidebar } from "./";
import { quickSortSteps } from "./tutorialData";
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

            <StepVisualizer steps = {quickSortSteps} mergesort={false}/>

    </div>
    );
};

const QuicksortText = () => {
    return (
        <div className={tutorialContent["text-container"]}>
            Die Idee des Algorithmus basiert auf dem Prinzip <span className={tutorialContent["font-highlight"]}> "divide and conquer"</span>.
            Dabei wird das Array in zwei Teilarrays aufgeteilt: eines enthält Werte, die kleiner als das Pivotelement sind, und das andere Werte, die größer sind. Dieser Prozess wird rekursiv wiederholt, bis das Array nicht weiter zerlegbar ist. In unserem Fall wird das letzte Element des betrachteten Arrays als Pivotelement gewählt.
            <br/><br/>

            <div className={tutorialContent["image-container"]}>
            <img src={quicksortidee} className = {tutorialContent["image"]} alt="quicksort idee"/>
            </div>

            Die Laufzeit hängt von der Wahl des Pivotelements ab. Wird das Pivotelement so gewählt, dass es nach dem Partitionalgorithmus in der Mitte des Arrays liegt, ähnelt die Zerlegung der von Mergesort, bei der das Array in zwei gleich große Teile aufgeteilt wird. In diesem Fall beträgt die Laufzeit  <span className={tutorialContent["font-highlight"]}> O(nlogn)</span>, was der durchschnittlichen Laufzeit entspricht. Im schlimmsten Fall kann die Laufzeit jedoch <span className={tutorialContent["font-highlight"]}> O(n<sup>2</sup>)</span> betragen, wenn das Pivotelement immer das größte oder kleinste Element des Arrays ist.
        </div>
    );
};

export default QuicksortTutorial;
