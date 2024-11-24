import mergesortPseudo from "../../assets/mergeSortpseudo.png";
import mergePseudo from "../../assets/mergepseudo.png";
import tutorialContent from "../../styles/sortSensei/TutorialContent.module.css"

const MergesortTutorial = () => {
    return (
    <div className={tutorialContent["content-container"]}> 
        <h1>Anleitung zum Mergesort!</h1>
        <img src={mergesortPseudo} alt="mergesort pseudocode"/>
        <img src={mergePseudo} alt="merge pseudocode"/>
    </div>
        
        );
};

export default MergesortTutorial;