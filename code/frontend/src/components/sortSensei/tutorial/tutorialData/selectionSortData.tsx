import { Step } from "../StepVisualizer";

function whitecolor(): string {
    return "#f4f4f9";
}

function redcolor(): string {
    return "rgb(248, 215, 218)";
}


export const selection_steps:Step[] = [
    { description: "Betracte Array Elemente 0...4",
        data: 
        [ 
            { array:[13,10,12,1,6],color:whitecolor()}
        ]
    },
    { description: "Betracte Array Elemente 0...4",
        data: 
        [ 
            { array:[13,10,12,1,6],color:redcolor()}
        ]
    },
    { description: "Finde kleinstes Element in Array 0...4",
        data: 
        [ 
            { array:[13,10,12,1,6],color:whitecolor()}
        ]
    },
    { description: "Finde kleinstes Element in Array 0...4",
        data: 
        [ 
            { array:[13,10,12],color:whitecolor()},
            { array:[1],color:redcolor()},
            { array:[6],color:whitecolor()},
        ]
    },
    { description: "Tausche mit erstem Element",
        data: 
        [ 
            { array:[13,10,12],color:whitecolor()},
            { array:[1],color:redcolor()},
            { array:[6],color:whitecolor()},
        ]
    },
    { description: "Tausche mit erstem Element",
        data: 
        [ 
            { array:[13],color:redcolor()},
            { array:[10,12],color:whitecolor()},
            { array:[1],color:redcolor()},
            { array:[6],color:whitecolor()},
        ]
    }, 
    { description: "Betracte Teilarray Elemente 1...4",
        data: 
        [ 
            { array:[1,10,12,13,6],color:whitecolor()},
        ]
    },
    { description: "Betracte Teilarray Elemente 1...4",
        data: 
        [ 
            { array:[1],color:whitecolor()},
            { array:[10,12,13,6],color:redcolor()},
        ]
    },
    { description: "Finde kleinstes Element in Teilarray 1...4",
        data: 
        [ 
            { array:[1],color:whitecolor()},
            { array:[10,12,13,6],color:whitecolor()},
        ]
    },
    { description: "Finde kleinstes Element in Teilarray 1...4",
        data: 
        [ 
            { array:[1],color:whitecolor()},
            { array:[10,12,13],color:whitecolor()},
            { array:[6],color:redcolor()},
        ]
    },
    { description: "Tausche mit erstem Element",
        data: 
        [ 
            { array:[1],color:whitecolor()},
            { array:[10,12,13],color:whitecolor()},
            { array:[6],color:redcolor()},
        ]
    },
    { description: "Tausche mit erstem Element",
        data: 
        [ 
            { array:[1],color:whitecolor()},
            { array:[10],color:redcolor()},
            { array:[12,13],color:whitecolor()},
            { array:[6],color:redcolor()},
        ]
    }, 
    { description: "Betracte Teilarray Elemente 2...4",
        data: 
        [ 
            { array:[1,6,12,13,10],color:whitecolor()}
        ]
    },
    { description: "Betrachte Teilarray Elemente 2...4",
        data: 
        [ 
            { array:[1,6],color:whitecolor()},
            { array:[12,13,10],color:redcolor()}
        ]
    },
    { description: "Finde kleinstes Element in Teilarray 2...4",
        data: 
        [ 
            { array:[1,6],color:whitecolor()},
            { array:[12,13,10],color:whitecolor()}
        ]
    },
    { description: "Finde kleinstes Element in Teilarray 2...4",
        data: 
        [ 
            { array:[1,6],color:whitecolor()},
            { array:[12,13],color:whitecolor()},
            { array:[10],color:redcolor()}
        ]
    },
    { description: "Tausche mit erstem Element",
        data: 
        [ 
            { array:[1,6],color:whitecolor()},
            { array:[12,13],color:whitecolor()},
            { array:[10],color:redcolor()}
        ]
    },
    { description: "Tausche mit erstem Element",
        data: 
        [ 
            { array:[1,6],color:whitecolor()},
            { array:[12],color:redcolor()},
            { array:[13],color:whitecolor()},
            { array:[10],color:redcolor()}
        ]
    }, 
    { description: "Betrachte Teilarray Elemente 3...4",
        data: 
        [ 
            { array:[1,6,10,13,12],color:whitecolor()}
        ]
    }, 
    { description: "Betrachte Teilarray Elemente 3...4",
        data: 
        [ 
            { array:[1,6,10],color:whitecolor()},
            { array:[13,12],color:redcolor()}
        ]
    }, 
    { description: "Finde kleinstes Element in Teilarray 3...4",
        data: 
        [ 
            { array:[1,6,10],color:whitecolor()},
            { array:[13,12],color:whitecolor()}
        ]
    }, 
    { description: "Finde kleinstes Element in Teilarray 3...4",
        data: 
        [ 
            { array:[1,6,10],color:whitecolor()},
            { array:[13],color:whitecolor()},
            { array:[12],color:redcolor()}
        ]
    },
    { description: "Tausche mit erstem Element",
        data: 
        [ 
            { array:[1,6,10],color:whitecolor()},
            { array:[13],color:whitecolor()},
            { array:[12],color:redcolor()}
        ]
    },
    { description: "Tausche mit erstem Element",
        data: 
        [ 
            { array:[1,6,10],color:whitecolor()},
            { array:[13],color:redcolor()},
            { array:[12],color:redcolor()}
        ]
    }, 
    { description: "Fertig!",
        data: 
        [ 
            { array:[1,6,10,12,13],color:whitecolor()}
        ]
    }, 

]

export default selection_steps;