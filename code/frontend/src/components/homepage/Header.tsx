import React from "react";
import { Link } from "react-router-dom";
import tubsLogo from "../../assets/tu-logo.png";
import hamburger from "../../assets/hamburger_button.png";
// import "../../styles/homepage/Header.css";
const Header = () => {
  return (
    <div className="header-content">
      <a href={"https://aud.ibr.cs.tu-bs.de"}>
        <div className="header-logo-container">
          <img className="header-logo-image" src={tubsLogo} alt="logo of TU Braunssweig" />
          <div className="header-logo-text">Algorithmen und Datenstrukturen</div>
        </div>
      </a>

      <div className="header-nav">
        <ul className="header-nav-list">
          <li className="header-nav-item">
            <Link className="no-underline" to="">
              TreeTutor
            </Link>
          </li>
          <li className="header-nav-item">
            <Link className="no-underline" to="">
              SortSensei ▼
            </Link>
          </li>
          <li className="header-nav-item">
            <Link className="no-underline" to="">
              Kontakt
            </Link>
          </li>
        </ul>
        
        {/* <div className="hamburger"> 
          <img className="hamburger-icon" src={hamburger} alt="hamburger icon" />
          <span className="bar">TreeTutor</span>
          <span className="bar">SortSensei</span>
          <span className="bar">Kontakt</span>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
