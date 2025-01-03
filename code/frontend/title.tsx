import { useEffect } from "react";

function addTitle(str:string) {
    return "Audojo - " + str;
}

function setTitle(to:string) {
    useEffect( () => {
        document.title = addTitle(to);
    }) 
}

export default setTitle;