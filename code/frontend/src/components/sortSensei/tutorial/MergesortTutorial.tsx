import mergesortPseudo from "@assets/mergeSortpseudo.png";
import mergePseudo from "@assets/mergepseudo.png";
import tutorialContent from "@styles/sortSensei/tutorial/TutorialContent.module.css";
import { StepVisualizer, TutorialSidebar } from "./";
import { merge_steps } from "./tutorialData/mergeSortData";

const MergesortTutorial = () => {
  return (
    <div className={tutorialContent["content-container"]}>
      <div className={tutorialContent["title"]}> Anleitung zum Mergesort!</div>
      <TutorialSidebar title="Aufklappen für Pseudocode">
        <div className={tutorialContent["image-container"]}>
          <img
            src={mergesortPseudo}
            className={tutorialContent["image"]}
            alt="mergesort pseudocode"
          />
          <img
            src={mergePseudo}
            className={tutorialContent["image"]}
            alt="merge pseudocode"
          />
        </div>
      </TutorialSidebar>
      <StepVisualizer steps={merge_steps} />
    </div>
  );
};

export default MergesortTutorial;
