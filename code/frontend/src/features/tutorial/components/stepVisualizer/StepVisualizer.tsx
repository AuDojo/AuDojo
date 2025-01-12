import { Step } from "@features/tutorial/types";
import { useState } from "react";
import tutorialContent from "./StepVisualizer.module.css";

type VisualizerProps = {
  steps: Step[]; // Define the type of the step prop
  mergesort: boolean;
};

const Visualizer = ({ steps, mergesort }: VisualizerProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
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
    setCurrentStep(steps.length - 1);
  };

  return (
    <>
      {" "}
      <h1>Beispiel</h1>
      <div className={tutorialContent["visualiser-container"]}>
        <h3>{steps[currentStep].description}</h3>
        {/* array container */}
        <div className={tutorialContent["array-container"]}>
          {steps[currentStep].data.map((component, index) => (
            <div key={index} className={tutorialContent[mergesort === false ? "array" : "array-merge"]}>
              {component.array.map((num, i) => (
                <span key={i} className={tutorialContent["box"]} style={{ background: component.color }}>
                  {num}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Step Navigation */}
        <div>
          <button onClick={goToFirstStep} disabled={currentStep === 0} className={tutorialContent["button-style"]}>
            {"<<"}
          </button>
          <button onClick={goToPrevStep} disabled={currentStep === 0} className={tutorialContent["button-style"]}>
            {"<"}
          </button>
          <span style={{ margin: "0 20px" }}>
            Step {currentStep + 1} / {steps.length}
          </span>
          <button
            onClick={goToNextStep}
            disabled={currentStep === steps.length - 1}
            className={tutorialContent["button-style"]}
          >
            {">"}
          </button>
          <button
            onClick={goToLaststep}
            disabled={currentStep === steps.length - 1}
            className={tutorialContent["button-style"]}
          >
            {">>"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Visualizer;
