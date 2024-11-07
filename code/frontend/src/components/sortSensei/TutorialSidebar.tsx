import React from "react";
import { useState } from 'react';
import tutorialsidebar from '../../styles/sortSensei/TutorialSidebar.module.css';



const TutorialSidebar = ({ title,children }:{title:string,children:React.ReactNode}) => {
    const [isOpen, toggle] = useState(false);

    const toggleSidebar = () =>  {
        toggle(!isOpen);
    };
    
    return (
    <div className={tutorialsidebar["sidebar"]}>
        <div className={tutorialsidebar["section-header"]} onClick={toggleSidebar}>
                <span className={`${tutorialsidebar["arrow"]} ${isOpen ? tutorialsidebar["open"] : ""}`}>
                    ▶
                </span>
                <h2 className={tutorialsidebar["sidebar-title"]}>{title}</h2>
        </div>

            
        {isOpen && (
            <div className={tutorialsidebar["section-content"]}>
                    {children}
            </div>)}
        </div>
    
       
    );
};

export default TutorialSidebar;