import { useState } from "react";

interface Step {
    description: string;
    data: {array: number[],colored:boolean}[];
}

// Example data representing steps
  const steps:Step[] = [
    { description: "Split the array into halves", data: 
        [
            {array:[13,10,12,1,6,2,25],colored:false}
        ]
    },
    { description: "Splitting...", data: 
        [
            {array:[13,10,12,1,6,2,25],colored:true}
        ]
    },
    { description: "Split the array into halves", data: 
        [
            {array:[13,10,12,1],colored:false},
            {array:[6,2,25],colored:false} 
        ]
    },
    { description: "Splitting...", data: 
        [
            {array:[13,10,12,1],colored:true},
            {array:[6,2,25],colored:false} 
        ]
    },
    { description: "Split the array into halves", data: 
        [
            {array:[13,10],colored:false},
            {array:[12,1],colored:false},
            {array:[6,2,25],colored:false}
        ]

     },
     { description: "Splitting...", data: 
        [
            {array:[13,10],colored:true},
            {array:[12,1],colored:false},
            {array:[6,2,25],colored:false}
        ]
     },
    { description: "sort and merge", data: 
        [
            {array:[13],colored:false},
            {array:[10],colored:false},
            {array:[12,1],colored:false},
            {array:[6,2,25],colored:false}
        ] 
    },
    { description: "sorting & merging...", data: 
        [
            {array:[13],colored:true},
            {array:[10],colored:true},
            {array:[12,1],colored:false},
            {array:[6,2,25],colored:false}
        ] 
    },
    { description: "merged", data: 
        [
            {array:[10,13],colored:true},
            {array:[12,1],colored:false},
            {array:[6,2,25],colored:false}
        ] 
    },
    { description: "Split the array into halves", data: 
        [
            {array:[10,13],colored:false},
            {array:[12,1],colored:true},
            {array:[6,2,25],colored:false}
        ]
     },
     { description: "Split the array into halves", data: 
        [
            {array:[10,13],colored:false},
            {array:[12],colored:false},
            {array:[1],colored:false},
            {array:[6,2,25],colored:false}
        ]
     },
     { description: "Sort & Merge:", data: 
        [
            {array:[10,13],colored:false},
            {array:[12],colored:true},
            {array:[1],colored:true},
            {array:[6,2,25],colored:false}
        ]
     },
     { description: "Sort & Merge:", data: 
        [
            {array:[10,13],colored:false},
            {array:[1,12],colored:false},
            {array:[6,2,25],colored:false}
        ]
     },
     { description: "Sort & Merge:", data: 
        [
            {array:[10,13],colored:true},
            {array:[1,12],colored:true},
            {array:[6,2,25],colored:false}
        ]
     },
     { description: "Split", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[6,2,25],colored:false}
        ]
     },
     { description: "Splitting...", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[6,2,25],colored:true}
        ]
     },
     { description: "divide", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[6,2],colored:false},
            {array:[25],colored:false}
        ]
     },
     { description: "dividing...", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[6,2],colored:true},
            {array:[25],colored:false}
        ]
     },
     { description: "merge & sort", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[6],colored:false},
            {array:[2],colored:false},
            {array:[25],colored:false}
        ]
     },
     { description: "merging & sorting...", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[6],colored:true},
            {array:[2],colored:true},
            {array:[25],colored:false}
        ]
     },
     { description: "merg & sort", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[2,6],colored:false},
            {array:[25],colored:false}
        ]
     },
     { description: "merging & sorting...", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[2,6],colored:true},
            {array:[25],colored:true}
        ]
     },
     { description: "merge & sort", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[2,6,25],colored:false},
        ]
     },
     { description: "merging & sorting...", data: 
        [
            {array:[1,10,12,13],colored:true},
            {array:[2,6,25],colored:true},
        ]
     },
     { description: "Done!", data: 
        [
            {array:[1,2,6,10,12,13,25],colored:false},
        ]
     },
  ];



const Visualizer= () => {

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
        <div style={{ textAlign: "center", padding: "20px" }}>
          {/* Step Visual */}
          <div>
            <h3>{steps[currentStep].description}</h3>

            {/* array container */}
            <div style={{ margin: "20px", fontSize: "18px" }}>
              {
                steps[currentStep].data.map((component, index) => (
                    <div key={index} style={{ display: "inline-block", margin: "10px" }}>
                      {component.array.map((num, i) => (
                        <span
                          key={i}
                          style={{
                            display: "inline-block",
                            padding: "5px 10px",
                            border: "1px solid black",
                            margin: "2px",
                            borderRadius: "5px",
                            background: component.colored == false ? "#f4f4f9":"red",
                          }}
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  ))
                }
            </div>


          </div>
    
          {/* Step Navigation */}
          <div style={{ marginTop: "20px" }}>
            <button onClick={goToPrevStep} disabled={currentStep === 0} style={buttonStyle}>
              {"<<"}
            </button>
            <span style={{ margin: "0 20px" }}>
              Step {currentStep + 1} / {steps.length}
            </span>
            <button onClick={goToNextStep} disabled={currentStep === steps.length - 1} style={buttonStyle}>
              {">>"}
            </button>
          </div>
        </div>
      );
    };
    
    // Button Style
    const buttonStyle = {
      padding: "10px 20px",
      margin: "0 5px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      backgroundColor: "#eaeaea",
      cursor: "pointer",
      fontSize: "16px",
    };
    
    export default Visualizer;
