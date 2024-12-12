import tutorialsidebar from "@styles/sortSensei/tutorial/TutorialSidebar.module.css";
import React, { useState } from "react";

const TutorialSidebar = ({
  title,
  children,
  subtitle
}: {
  title: string;
  children: React.ReactNode;
  subtitle:boolean
}) => {
  const [isOpen, toggle] = useState(false);

  const toggleSidebar = () => {
    toggle(!isOpen);
  };

  return (
    <div className={tutorialsidebar["sidebar"]}>
      <div
        className={tutorialsidebar["section-header"]}
        onClick={toggleSidebar}
      >
        <span
          className={`${tutorialsidebar["arrow"]} ${
            isOpen ? tutorialsidebar["open"] : ""
          }`}
        >
          ▶
        </span>

        <div className={
          tutorialsidebar[subtitle?"sidebar-subtitle":"sidebar-title"]
          }>{title}</div>

      </div>

      {isOpen && (
        <div className={tutorialsidebar["section-content"]}>{children}</div>
      )}
    </div>
  );
};

export default TutorialSidebar;
