import selectionPseudo from "@features/tutorial/assets/selectionsortpseudo.jpg";
import { StepVisualizer, TutorialSidebar } from "@features/tutorial/components";
import { selectionSortSteps } from "@features/tutorial/data";
import tutorialContent from "./TutorialContent.module.css";

const SelectionsortTutorial = () => {
  return (
    <div className={tutorialContent["content-container"]}>
      <TutorialSidebar title="Aufklappen für Idee des Algorithmus" subtitle={true}>
        <SelectionsortText />
      </TutorialSidebar>

      <TutorialSidebar title="Aufklappen für Pseudocode" subtitle={true}>
        <div className={tutorialContent["image-container"]}>
          <img src={selectionPseudo} className={tutorialContent["image"]} alt="selectionsort pseudocode" />
        </div>
      </TutorialSidebar>

      <StepVisualizer steps={selectionSortSteps} mergesort={false} />
    </div>
  );
};

const SelectionsortText = () => {
  return (
    <div className={tutorialContent["text-container"]}>
      Der Algorithmus arbeitet <span className={tutorialContent["font-highlight"]}> iterativ</span>. Die Grundidee
      besteht darin, das kleinste Element im (Teil-)Array zu finden und es ganz nach links zu verschieben. Anschließend
      wird der betrachtete Bereich des Arrays um ein Element verkleinert. Das Ergebnis ist, dass das kleinste Element
      des gesamten Arrays ganz links steht, das zweitkleinste rechts davon und so weiter.
      <br />
      <br />
      In jedem Teilarray wird das kleinste Element gesucht, was O(n) Zeit benötigt. Da es O(n) Teilarrays gibt, beträgt
      die Gesamtlaufzeit des Algorithmus{" "}
      <span className={tutorialContent["font-highlight"]}>
        {" "}
        O(n<sup>2</sup>){" "}
      </span>
      .
    </div>
  );
};

export default SelectionsortTutorial;
