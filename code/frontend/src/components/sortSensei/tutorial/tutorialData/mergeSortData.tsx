import { Step } from "../StepVisualizer";

function whitecolor(): string {
    return "#f4f4f9";
}

function redcolor(): string {
    return "rgb(248, 215, 218)";
}

// Example data representing steps
export const merge_steps:Step[] = [
    { description: "Teile das Array in Hälften auf", data: 
        [
            {array:[13,10,12,1,6,2,25],color:whitecolor()}
        ]
    },
    { description: "Teile das rot makierte (Teil)Array", data: 
        [
            {array:[13,10,12,1,6,2,25],color:redcolor()}
        ]
    },
    { description: "Teile das Array in Hälften auf", data: 
        [
            {array:[13,10,12,1],color:whitecolor()},
            {array:[6,2,25],color:whitecolor()} 
        ]
    },
    { description: "Teile das rot makierte (Teil)Array", data: 
        [
            {array:[13,10,12,1],color:redcolor()},
            {array:[6,2,25],color:whitecolor()} 
        ]
    },
    { description: "Teile das Array in Hälften auf", data: 
        [
            {array:[13,10],color:whitecolor()},
            {array:[12,1],color:whitecolor()},
            {array:[6,2,25],color:whitecolor()}
        ]

     },
     { description: "Teile das rot makierte (Teil)Array", data: 
        [
            {array:[13,10],color:redcolor()},
            {array:[12,1],color:whitecolor()},
            {array:[6,2,25],color:whitecolor()}
        ]
     },
    { description: "Sort & Merge", data: 
        [
            {array:[13],color:whitecolor()},
            {array:[10],color:whitecolor()},
            {array:[12,1],color:whitecolor()},
            {array:[6,2,25],color:whitecolor()}
        ] 
    },
    { description: "Sotieren und füge das rot markierte Teilarray zusammen", data: 
        [
            {array:[13],color:redcolor()},
            {array:[10],color:redcolor()},
            {array:[12,1],color:whitecolor()},
            {array:[6,2,25],color:whitecolor()}
        ] 
    },
    { description: "Teile das Array in Hälften auf", data: 
        [
            {array:[10,13],color:whitecolor()},
            {array:[12,1],color:whitecolor()},
            {array:[6,2,25],color:whitecolor()}
        ]
     },
    { description: "Teile das Array in Hälften auf", data: 
        [
            {array:[10,13],color:whitecolor()},
            {array:[12,1],color:redcolor()},
            {array:[6,2,25],color:whitecolor()}
        ]
     },
     { description: "Sort & Merge:", data: 
        [
            {array:[10,13],color:whitecolor()},
            {array:[12],color:whitecolor()},
            {array:[1],color:whitecolor()},
            {array:[6,2,25],color:whitecolor()}
        ]
     },
     { description: "Sotieren und füge das rot markierte Teilarray zusammen", data: 
        [
            {array:[10,13],color:whitecolor()},
            {array:[12],color:redcolor()},
            {array:[1],color:redcolor()},
            {array:[6,2,25],color:whitecolor()}
        ]
     },
     { description: "Sort & Merge:", data: 
        [
            {array:[10,13],color:whitecolor()},
            {array:[1,12],color:whitecolor()},
            {array:[6,2,25],color:whitecolor()}
        ]
     },
     { description: "Sotieren und füge das rot markierte Teilarray zusammen", data: 
        [
            {array:[10,13],color:redcolor()},
            {array:[1,12],color:redcolor()},
            {array:[6,2,25],color:whitecolor()}
        ]
     },
     { description: "Teile das Array in Hälften auf", data: 
        [
            {array:[1,10,12,13],color:whitecolor()},
            {array:[6,2,25],color:whitecolor()}
        ]
     },
     { description: "Teile das rot makierte (Teil)Array", data: 
        [
            {array:[1,10,12,13],color:whitecolor()},
            {array:[6,2,25],color:redcolor()}
        ]
     },
     { description: "Teile das Array in Hälften auf", data: 
        [
            {array:[1,10,12,13],color:whitecolor()},
            {array:[6,2],color:whitecolor()},
            {array:[25],color:whitecolor()}
        ]
     },
     { description: "Teile das rot makierte (Teil)Array", data: 
        [
            {array:[1,10,12,13],color:whitecolor()},
            {array:[6,2],color:redcolor()},
            {array:[25],color:whitecolor()}
        ]
     },
     { description: "Sort & Merge:", data: 
        [
            {array:[1,10,12,13],color:whitecolor()},
            {array:[6],color:whitecolor()},
            {array:[2],color:whitecolor()},
            {array:[25],color:whitecolor()}
        ]
     },
     { description: "Sotieren und füge das rot markierte Teilarray zusammen", data: 
        [
            {array:[1,10,12,13],color:whitecolor()},
            {array:[6],color:redcolor()},
            {array:[2],color:redcolor()},
            {array:[25],color:whitecolor()}
        ]
     },
     { description: "Sort & Merge:", data: 
        [
            {array:[1,10,12,13],color:whitecolor()},
            {array:[2,6],color:whitecolor()},
            {array:[25],color:whitecolor()}
        ]
     },
     { description: "Sotieren und füge das rot markierte Teilarray zusammen", data: 
        [
            {array:[1,10,12,13],color:whitecolor()},
            {array:[2,6],color:redcolor()},
            {array:[25],color:redcolor()}
        ]
     },
     { description: "Sort & Merge:", data: 
        [
            {array:[1,10,12,13],color:whitecolor()},
            {array:[2,6,25],color:whitecolor()},
        ]
     },
     { description: "Sotieren und füge das rot markierte Teilarray zusammen", data: 
        [
            {array:[1,10,12,13],color:redcolor()},
            {array:[2,6,25],color:redcolor()},
        ]
     },
     { description: "Fertig!", data: 
        [
            {array:[1,2,6,10,12,13,25],color:whitecolor()},
        ]
     },
  ];