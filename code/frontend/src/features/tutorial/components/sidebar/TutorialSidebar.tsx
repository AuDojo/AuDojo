import React, { useState } from "react";
import tutorialsidebar from "./TutorialSidebar.module.css";
import { StepVisualizer } from "../stepVisualizer";
import { Step } from "../../types";

const TutorialSidebar = ({
  title,
  algexp,
  photo,
  sortsteps,
  sortType
}: {
  title: string;
  algexp: React.ReactNode;
  photo: React.ReactNode;
  sortsteps: Step[]
  sortType:string;

}) => {
  const [isOpen, toggle] = useState(false);

  const toggleSidebar = () => {
    toggle(!isOpen);
  };

  return (
    <div className={tutorialsidebar["sidebar"]}>
      <div className={tutorialsidebar["section-header"]} onClick={toggleSidebar}>
        <span className={`${tutorialsidebar["arrow"]} ${isOpen ? tutorialsidebar["open"] : ""}`}>▶</span>

        <div className={tutorialsidebar["sidebar-title"]}>{title}</div>
      </div>

      {isOpen && (
        <div className={tutorialsidebar["section-content"]}>
          <TutorialSubSidebar title="Aufklappen für Idee des Algorithmus">{algexp}</TutorialSubSidebar>

          <TutorialSubSidebar title="Aufklappen für Pseudocode">{photo}</TutorialSubSidebar>

          <StepVisualizer steps={sortsteps} sortType={sortType} />
        </div>
      )}
    </div>
  );
}

const TutorialSubSidebar = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, toggle] = useState(false);

  const toggleSidebar = () => {
    toggle(!isOpen);
  };

  return (
    <div className={tutorialsidebar["sidebar"]}>
      <div className={tutorialsidebar["section-header"]} onClick={toggleSidebar}>
        <span className={`${tutorialsidebar["arrow"]} ${isOpen ? tutorialsidebar["open"] : ""}`}>▶</span>

        <div className={tutorialsidebar["sidebar-subtitle"]}>{title}</div>
      </div>

      {isOpen && <div className={tutorialsidebar["section-content"]}>{children}</div>}
    </div>
  );
};

export default TutorialSidebar;
