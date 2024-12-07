import { useState } from "react";
import tutorialContent from "../../../styles/sortSensei/tutorial/TutorialContent.module.css";

export interface Step {
    description: string;
    data: {array: number[],colored:boolean}[];
}

type VisualizerProps = {
    steps: Step[]; // Define the type of the step prop
};

const Visualizer:React.FC<VisualizerProps> = ({ steps }) => {

  // Step index state
  const [currentStep, setCurrentStep] = useState(0);

  // Handlers for navigation
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

    return (
        <div className={tutorialContent["visualiser-container"]}>
            <h3>{steps[currentStep].description}</h3>
            {/* array container */}
            <div className={tutorialContent["array-container"]}>
              {
                steps[currentStep].data.map((component, index) => (
                    <div key={index} className={tutorialContent["array"]}>
                      {component.array.map((num, i) => (
                        <span key={i} className={tutorialContent["box"]} style={{ background: component.colored == false ? "#f4f4f9":"rgb(248, 215, 218)"}}>
                          {num}
                        </span>
                      ))}
                    </div>
                  ))
                }
            </div>
    
          {/* Step Navigation */}
          <div>
            <button onClick={goToPrevStep} disabled={currentStep === 0} className={tutorialContent["button-style"]}>
              {"<<"}
            </button>
            <span style={{ margin: "0 20px" }}>
              Step {currentStep + 1} / {steps.length}
            </span>
            <button onClick={goToNextStep} disabled={currentStep === steps.length - 1} className={tutorialContent["button-style"]}>
              {">>"}
            </button>
          </div>
        </div>
      );
    };
    
    
    export default Visualizer;
