import bubblesortPseudo from "@features/tutorial/assets/bubblesortpseudo.png";
import { StepVisualizer, TutorialSidebar } from "@features/tutorial/components";
import { bubbleSortSteps } from "@features/tutorial/data";
import tutorialContent from "./TutorialContent.module.css";

const BubblesortTutorial = () => {
  return (
    <div className={tutorialContent["content-container"]}>
      <TutorialSidebar title="Aufklappen für Idee des Algorithmus" subtitle={true}>
        <BubblesortText />
      </TutorialSidebar>

      <TutorialSidebar title="Aufklappen für Pseudocode" subtitle={true}>
        <div className={tutorialContent["image-container"]}>
          <img src={bubblesortPseudo} className={tutorialContent["image"]} alt="bubblesort pseudocode" />
        </div>
      </TutorialSidebar>

      <StepVisualizer steps={bubbleSortSteps} mergesort={false} />
    </div>
  );
};

const BubblesortText = () => {
  return (
    <div className={tutorialContent["text-container"]}>
      Der Algorithmus arbeitet <span className={tutorialContent["font-highlight"]}> iterativ</span>. Die Grundidee
      besteht darin, stets das größere Element mit seinem Nachbarn zu tauschen und nach rechts zu verschieben. Nach
      jeder Iteration wird der Endindex um eins reduziert. Nach der ersten Iteration befindet sich das größte Element
      des gesamten Arrays ganz rechts. In der nächsten Iteration wird das nächstgrößere Element links von diesem Element
      platziert.
      <br />
      <br />
      Während einer Iteration werden O(n) Elemente verglichen und gegebenenfalls getauscht. Die Anzahl der Iterationen
      entspricht der Länge des Arrays minus 1, was ebenfalls O(n) ist. Somit ergibt sich für den Algorithmus eine
      Gesamtlaufzeit von{" "}
      <span className={tutorialContent["font-highlight"]}>
        {" "}
        O(n<sup>2</sup>)
      </span>
      .
    </div>
  );
};

export default BubblesortTutorial;
