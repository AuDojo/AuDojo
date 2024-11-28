import { Step } from "../StepVisualizer";

// Example data representing steps
export const merge_steps:Step[] = [
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
    { description: "Sort and Merge", data: 
        [
            {array:[13],colored:false},
            {array:[10],colored:false},
            {array:[12,1],colored:false},
            {array:[6,2,25],colored:false}
        ] 
    },
    { description: "Sorting & Merging...", data: 
        [
            {array:[13],colored:true},
            {array:[10],colored:true},
            {array:[12,1],colored:false},
            {array:[6,2,25],colored:false}
        ] 
    },
    { description: "Split the array into halves", data: 
        [
            {array:[10,13],colored:false},
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
     { description: "Split the array into halves", data: 
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
     { description: "Split the array into halves", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[6,2],colored:false},
            {array:[25],colored:false}
        ]
     },
     { description: "Splitting...", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[6,2],colored:true},
            {array:[25],colored:false}
        ]
     },
     { description: "Merge & Sort", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[6],colored:false},
            {array:[2],colored:false},
            {array:[25],colored:false}
        ]
     },
     { description: "Merging & Sorting...", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[6],colored:true},
            {array:[2],colored:true},
            {array:[25],colored:false}
        ]
     },
     { description: "Merge & Sort", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[2,6],colored:false},
            {array:[25],colored:false}
        ]
     },
     { description: "Merging & Sorting...", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[2,6],colored:true},
            {array:[25],colored:true}
        ]
     },
     { description: "Merge & Sort", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[2,6,25],colored:false},
        ]
     },
     { description: "Merging & Sorting...", data: 
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