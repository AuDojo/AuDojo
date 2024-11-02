import { useState } from "react";
import HeaderLogo from "./HeaderLogo";
import HeaderNavItem from "./HeaderNavItem";
import headerStyles from "../../styles/homepage/Header.module.css";
const Header = () => {
    const [isOpen, setOpen] = useState(false);
    const toogleMenu = () => {
        setOpen(!isOpen);
    };
    return (<div className={headerStyles["header-container"]}>
      <HeaderLogo />

      <div className={headerStyles["header-nav"]}>
        <div className={`${headerStyles["header-nav-list"]} ${isOpen ? headerStyles.open : ""}`}>
          <HeaderNavItem to="https://aud.ibr.cs.tu-bs.de" text="TreeTutor"/>
          <HeaderNavItem to="/sortsensei" text="SortSensei ▼"/>
          <HeaderNavItem to="https://aud.ibr.cs.tu-bs.de" text="Kontakt"/>
        </div>

        <div className={`${headerStyles["hamburger"]} ${isOpen ? headerStyles.change : ""}`} onClick={toogleMenu}>
          <div className={headerStyles["bar1"]}></div>
          <div className={headerStyles["bar2"]}></div>
          <div className={headerStyles["bar3"]}></div>
        </div>
      </div>
    </div>);
};
export default Header;
