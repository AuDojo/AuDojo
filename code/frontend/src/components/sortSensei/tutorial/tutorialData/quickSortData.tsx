import { Step } from "../StepVisualizer";
import bubble_steps from "./bubbleSortData";

function whitecolor(): string {
    return "#f4f4f9";
}

function redcolor(): string {
    return "rgb(248, 215, 218)";
}

function bluecolor():string {
    return "rgb(125, 249, 255)";
}

const quick_steps:Step[] = [
    { description: "Partition 0...6",
        data: 
        [ 
            { array:[2,1,5,12,3,13,4],color:whitecolor()}
        ]
    },
    { description: "Partition, Pivot=4",
        data: 
        [ 
            { array:[2,1,5,12,3,13],color:whitecolor()},
            { array:[4],color:bluecolor()}
        ]
    },
    { description: "2 <= 4",
        data: 
        [ 
            { array:[2],color:redcolor()},
            { array:[1,5,12,3,13],color:whitecolor()},
            { array:[4],color:bluecolor()}
        ]
    },
    { description: "1 <= 4",
        data: 
        [ 
            { array:[2],color:whitecolor()},
            { array:[1],color:redcolor()},
            { array:[5,12,3,13],color:whitecolor()},
            { array:[4],color:bluecolor()}
        ]
    },
    { description: "5 > 4",
        data: 
        [ 
            { array:[2,1],color:whitecolor()},
            { array:[5],color:redcolor()},
            { array:[12,3,13],color:whitecolor()},
            { array:[4],color:bluecolor()}
        ]
    },
    { description: "12 > 4",
        data: 
        [ 
            { array:[2,1],color:whitecolor()},
            { array:[5,12],color:redcolor()},
            { array:[3,13],color:whitecolor()},
            { array:[4],color:bluecolor()}
        ]
    },
    { description: "3 <= 4",
        data: 
        [ 
            { array:[2,1],color:whitecolor()},
            { array:[5,12],color:redcolor()},
            { array:[3],color:redcolor()},
            { array:[13],color:whitecolor()},
            { array:[4],color:bluecolor()}
        ]
    },
    { description: "Tausche mit erstem Element von rotem Array",
        data: 
        [ 
            { array:[2,1],color:whitecolor()},
            { array:[5],color:redcolor()},
            { array:[12],color:redcolor()},
            { array:[3],color:redcolor()},
            { array:[13],color:whitecolor()},
            { array:[4],color:bluecolor()}
        ]
    },
    { description: "Tausche mit erstem Element von rotem Array",
        data: 
        [ 
            { array:[2,1,3],color:whitecolor()},
            { array:[12,5],color:redcolor()},
            { array:[13],color:whitecolor()},
            { array:[4],color:bluecolor()}
        ]
    },
    { description: "13>4",
        data: 
        [ 
            { array:[2,1,3],color:whitecolor()},
            { array:[12,5],color:redcolor()},
            { array:[13],color:redcolor()},
            { array:[4],color:bluecolor()}
        ]
    },
    { description: "Tausche Pivotelement mit erstem Element von rotem Array",
        data: 
        [ 
            { array:[2,1,3],color:whitecolor()},
            { array:[12,5,13],color:redcolor()},
            { array:[4],color:bluecolor()}
        ]
    },
    { description: "Tausche Pivotelement mit erstem Element von rotem Array",
        data: 
        [ 
            { array:[2,1,3],color:whitecolor()},
            { array:[4],color:bluecolor()},
            { array:[5,13,12],color:whitecolor()},
        ]
    },
    { description: "Partition für Teilarray 0...2",
        data: 
        [ 
            { array:[2,1,3],color:whitecolor()},
            { array:[4],color:bluecolor()},
            { array:[5,13,12],color:whitecolor()},
        ]
    },
    { description: "Pivotelement: 3",
        data: 
        [ 
            { array:[2,1,3],color:whitecolor()},
            { array:[4],color:bluecolor()},
            { array:[5,13,12],color:whitecolor()},
        ]
    },
    { description: "Pivotelement: 3",
        data: 
        [ 
            { array:[2,1],color:whitecolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5,13,12],color:whitecolor()},
        ]
    },
    { description: "2 <= 3",
        data: 
        [ 
            { array:[2],color:redcolor()},
            { array:[1],color:whitecolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5,13,12],color:whitecolor()},
        ]
    },
    { description: "1 <= 3",
        data: 
        [ 
            { array:[2],color:whitecolor()},
            { array:[1],color:redcolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5,13,12],color:whitecolor()},
        ]
    },
    { description: "Tausche Pivotelement mit erstem Element von rotem Array: Hier nichts machen",
        data: 
        [ 
            { array:[2,1],color:whitecolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5,13,12],color:whitecolor()},
        ]
    },
    { description: "Partition für Teilarray 0...1",
        data: 
        [ 
            { array:[2,1],color:whitecolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5,13,12],color:whitecolor()},
        ]
    },
    { description: "Pivotelement:1",
        data: 
        [ 
            { array:[2,1],color:whitecolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5,13,12],color:whitecolor()},
        ]
    },
    { description: "Pivotelement:1",
        data: 
        [ 
            { array:[2],color:whitecolor()},
            { array:[1],color:bluecolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5,13,12],color:whitecolor()},
        ]
    },
    { description: "2 > 1",
        data: 
        [ 
            { array:[2],color:redcolor()},
            { array:[1],color:bluecolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5,13,12],color:whitecolor()},
        ]
    },
    { description: "Tausche Pivotelement mit erstem Element von rotem Array",
        data: 
        [ 
            { array:[2],color:redcolor()},
            { array:[1],color:bluecolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5,13,12],color:whitecolor()},
        ]
    },
    { description: "Tausche Pivotelement mit erstem Element von rotem Array",
        data: 
        [ 
            { array:[1],color:bluecolor()},
            { array:[2],color:whitecolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5,13,12],color:whitecolor()},
        ]
    },
    { description: "Partition 4...6",
        data: 
        [ 
            { array:[1],color:bluecolor()},
            { array:[2],color:whitecolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5,13,12],color:whitecolor()},
        ]
    },
    { description: "Pivotelement: 12",
        data: 
        [ 
            { array:[1],color:bluecolor()},
            { array:[2],color:whitecolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5,13,12],color:whitecolor()},
        ]
    },
    { description: "Pivotelement: 12",
        data: 
        [ 
            { array:[1],color:bluecolor()},
            { array:[2],color:whitecolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5,13],color:whitecolor()},
            { array:[12],color:bluecolor()},
        ]
    },
    { description: "5 <= 12",
        data: 
        [ 
            { array:[1],color:bluecolor()},
            { array:[2],color:whitecolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5],color:redcolor()},
            { array:[13],color:whitecolor()},
            { array:[12],color:bluecolor()},
        ]
    },
    { description: "13 > 12",
        data: 
        [ 
            { array:[1],color:bluecolor()},
            { array:[2],color:whitecolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5],color:whitecolor()},
            { array:[13],color:redcolor()},
            { array:[12],color:bluecolor()},
        ]
    },
    { description: "Tausche Pivotelement mit erstem Element von rotem Array",
        data: 
        [ 
            { array:[1],color:bluecolor()},
            { array:[2],color:whitecolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5],color:whitecolor()},
            { array:[13],color:redcolor()},
            { array:[12],color:bluecolor()},
        ]
    },
    { description: "Tausche Pivotelement mit erstem Element von rotem Array",
        data: 
        [ 
            { array:[1],color:bluecolor()},
            { array:[2],color:whitecolor()},
            { array:[3],color:bluecolor()},
            { array:[4],color:bluecolor()},
            { array:[5],color:whitecolor()},
            { array:[12],color:bluecolor()},
            { array:[13],color:whitecolor()},
        ]
    },
   
    { description: "Fertig!",
        data: 
        [ 
            { array:[1,2,3,4,5,12,13],color:whitecolor()},
        ]
    },
  
]

export default bubble_steps;