import quicksortidee from "@features/tutorial/assets/quicksortidee.png";
import partitionpseudo from "@features/tutorial/assets/quicksortpartition.png";
import quicksortPseudo from "@features/tutorial/assets/quicksortpseudo.png";
import { StepVisualizer, TutorialSidebar } from "@features/tutorial/components";
import { quickSortSteps } from "@features/tutorial/data";
import tutorialContent from "./TutorialContent.module.css";

const QuicksortTutorial = () => {
  return (
    <div className={tutorialContent["content-container"]}>
      <TutorialSidebar title="Aufklappen für Idee des Algorithmus" subtitle={true}>
        <QuicksortText />
      </TutorialSidebar>

      <TutorialSidebar title="Aufklappen für Pseudocode" subtitle={true}>
        <div className={tutorialContent["image-container"]}>
          <img src={quicksortPseudo} className={tutorialContent["image"]} alt="quicksort pseudocode" />
          <img src={partitionpseudo} className={tutorialContent["image"]} alt="partition pseudocode" />
        </div>
      </TutorialSidebar>

      <StepVisualizer steps={quickSortSteps} mergesort={false} />
    </div>
  );
};

const QuicksortText = () => {
  return (
    <div className={tutorialContent["text-container"]}>
      Die Idee des Algorithmus basiert auf dem Prinzip{" "}
      <span className={tutorialContent["font-highlight"]}> "divide and conquer"</span>. Dabei wird das Array in zwei
      Teilarrays aufgeteilt: eines enthält Werte, die kleiner als das pivotElements sind, und das andere Werte, die
      größer sind. Dieser Prozess wird rekursiv wiederholt, bis das Array nicht weiter zerlegbar ist. In unserem Fall
      wird das letzte Element des betrachteten Arrays als pivotElements gewählt.
      <br />
      <br />
      <div className={tutorialContent["image-container"]}>
        <img src={quicksortidee} className={tutorialContent["image"]} alt="quicksort idee" />
      </div>
      Die Laufzeit hängt von der Wahl des pivotElementss ab. Wird das pivotElements so gewählt, dass es nach dem
      Partitionalgorithmus in der Mitte des Arrays liegt, ähnelt die Zerlegung der von Mergesort, bei der das Array in
      zwei gleich große Teile aufgeteilt wird. In diesem Fall beträgt die Laufzeit{" "}
      <span className={tutorialContent["font-highlight"]}> O(nlogn)</span>, was der durchschnittlichen Laufzeit
      entspricht. Im schlimmsten Fall kann die Laufzeit jedoch{" "}
      <span className={tutorialContent["font-highlight"]}>
        {" "}
        O(n<sup>2</sup>)
      </span>{" "}
      betragen, wenn das pivotElements immer das größte oder kleinste Element des Arrays ist.
    </div>
  );
};

export default QuicksortTutorial;
