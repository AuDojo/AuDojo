import { useState } from "react";
// import tubsLogo from "../../assets/tu-logo.png";
import audojoLogo from "../../assets/logo-audojo.png";
import { Link } from "react-router-dom";
import headerStyles from "../../styles/sortSensei/SortHeader.module.css";
const HeaderNavItem = ({ to, text }: { to: string; text: string }) => {
  return (
    <Link className="Link" to={to}>
      <div className={headerStyles["header-nav-list-item"]}>{text}</div>
    </Link>
  );
};
const SortHeader = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toogleMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <div className={headerStyles["header-container"]}>
      <a href={"https://aud.ibr.cs.tu-bs.de"} target="_blank">
        <div className={headerStyles["header-logo-container"]}>
          <img className={headerStyles["header-logo-image"]} src={audojoLogo} alt="audojo logo" />
          <div className={headerStyles["header-logo-text"]}>Algorithmen und Datenstrukturen</div>
        </div>
      </a>

      <div className={headerStyles["header-nav"]}>
        <div className={`${headerStyles["header-nav-list"]}`}>
          <HeaderNavItem to="https://aud.ibr.cs.tu-bs.de" text="Mergesort" />
          <HeaderNavItem to="/sortsensei" text="Quicksort" />
          <HeaderNavItem to="https://aud.ibr.cs.tu-bs.de" text="Bubblesort" />
        </div>

        <div className={`${headerStyles["hamburger"]} ${isOpen ? headerStyles.change : ""}`} onClick={toogleMenu}>
          <div className={headerStyles["bar1"]}></div>
          <div className={headerStyles["bar2"]}></div>
          <div className={headerStyles["bar3"]}></div>
        </div>
      </div>
    </div>
  );
};

export default SortHeader;
