import { Step } from "../StepVisualizer";

// Example data representing steps
export const merge_steps:Step[] = [
    { description: "Teile das Array in Hälften auf", data: 
        [
            {array:[13,10,12,1,6,2,25],colored:false}
        ]
    },
    { description: "Teile das rot makierte (Teil)Array", data: 
        [
            {array:[13,10,12,1,6,2,25],colored:true}
        ]
    },
    { description: "Teile das Array in Hälften auf", data: 
        [
            {array:[13,10,12,1],colored:false},
            {array:[6,2,25],colored:false} 
        ]
    },
    { description: "Teile das rot makierte (Teil)Array", data: 
        [
            {array:[13,10,12,1],colored:true},
            {array:[6,2,25],colored:false} 
        ]
    },
    { description: "Teile das Array in Hälften auf", data: 
        [
            {array:[13,10],colored:false},
            {array:[12,1],colored:false},
            {array:[6,2,25],colored:false}
        ]

     },
     { description: "Teile das rot makierte (Teil)Array", data: 
        [
            {array:[13,10],colored:true},
            {array:[12,1],colored:false},
            {array:[6,2,25],colored:false}
        ]
     },
    { description: "Sort & Merge", data: 
        [
            {array:[13],colored:false},
            {array:[10],colored:false},
            {array:[12,1],colored:false},
            {array:[6,2,25],colored:false}
        ] 
    },
    { description: "Sotieren und füge das rot markierte Teilarray zusammen", data: 
        [
            {array:[13],colored:true},
            {array:[10],colored:true},
            {array:[12,1],colored:false},
            {array:[6,2,25],colored:false}
        ] 
    },
    { description: "Teile das Array in Hälften auf", data: 
        [
            {array:[10,13],colored:false},
            {array:[12,1],colored:false},
            {array:[6,2,25],colored:false}
        ]
     },
    { description: "Teile das Array in Hälften auf", data: 
        [
            {array:[10,13],colored:false},
            {array:[12,1],colored:true},
            {array:[6,2,25],colored:false}
        ]
     },
     { description: "Sort & Merge:", data: 
        [
            {array:[10,13],colored:false},
            {array:[12],colored:false},
            {array:[1],colored:false},
            {array:[6,2,25],colored:false}
        ]
     },
     { description: "Sotieren und füge das rot markierte Teilarray zusammen", data: 
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
     { description: "Sotieren und füge das rot markierte Teilarray zusammen", data: 
        [
            {array:[10,13],colored:true},
            {array:[1,12],colored:true},
            {array:[6,2,25],colored:false}
        ]
     },
     { description: "Teile das Array in Hälften auf", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[6,2,25],colored:false}
        ]
     },
     { description: "Teile das rot makierte (Teil)Array", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[6,2,25],colored:true}
        ]
     },
     { description: "Teile das Array in Hälften auf", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[6,2],colored:false},
            {array:[25],colored:false}
        ]
     },
     { description: "Teile das rot makierte (Teil)Array", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[6,2],colored:true},
            {array:[25],colored:false}
        ]
     },
     { description: "Sort & Merge:", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[6],colored:false},
            {array:[2],colored:false},
            {array:[25],colored:false}
        ]
     },
     { description: "Sotieren und füge das rot markierte Teilarray zusammen", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[6],colored:true},
            {array:[2],colored:true},
            {array:[25],colored:false}
        ]
     },
     { description: "Sort & Merge:", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[2,6],colored:false},
            {array:[25],colored:false}
        ]
     },
     { description: "Sotieren und füge das rot markierte Teilarray zusammen", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[2,6],colored:true},
            {array:[25],colored:true}
        ]
     },
     { description: "Sort & Merge:", data: 
        [
            {array:[1,10,12,13],colored:false},
            {array:[2,6,25],colored:false},
        ]
     },
     { description: "Sotieren und füge das rot markierte Teilarray zusammen", data: 
        [
            {array:[1,10,12,13],colored:true},
            {array:[2,6,25],colored:true},
        ]
     },
     { description: "Fertig!", data: 
        [
            {array:[1,2,6,10,12,13,25],colored:false},
        ]
     },
  ];