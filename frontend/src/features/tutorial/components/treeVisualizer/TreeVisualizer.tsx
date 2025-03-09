import { TreeSteps } from "../../types";
import { useState } from "react";
import styles from "./treeVisualizer.module.css";
import { TutorialTreeTemplate } from "../tutorialTreeTemplate";
const TreeVisualizer = ({ data, title }: { data: TreeSteps; title: String }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () => {
    if (currentStep < data.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToFirstStep = () => {
    setCurrentStep(0);
  };

  const goToLaststep = () => {
    setCurrentStep(data.steps.length - 1);
  };

  return (
    <div className={styles.visualiser}>
      <h1 className={styles.title}>{title}</h1>

      {/* Step Navigation */}
      <div className={styles.buttonContainer}>
        <button type="button" onClick={goToFirstStep} disabled={currentStep === 0} className={styles.buttonStyle}>
          {"<<"}
        </button>
        <button type="button" onClick={goToPrevStep} disabled={currentStep === 0} className={styles.buttonStyle}>
          {"<"}
        </button>
        <span style={{ margin: "0 20px" }}>
          Step {currentStep + 1} / {data.steps.length}
        </span>
        <button
          onClick={goToNextStep}
          type="button"
          disabled={currentStep === data.steps.length - 1}
          className={styles.buttonStyle}
        >
          {">"}
        </button>
        <button
          onClick={goToLaststep}
          type="button"
          disabled={currentStep === data.steps.length - 1}
          className={styles.buttonStyle}
        >
          {">>"}
        </button>
      </div>

      {
        <div className={styles.treeContainer}>
          <span>{data.steps[currentStep].description}</span>
          <TutorialTreeTemplate treeData={data.steps[currentStep].tree} />
        </div>
      }
    </div>
  );
};

export default TreeVisualizer;
