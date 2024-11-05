import { useState } from "react";
import HeaderLogo from "./HeaderLogo";
import HeaderNavItem from "./HeaderNavItem";
import headerStyles from "../../styles/homepage/Header.module.css";

const Header = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toogleMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <div className={headerStyles["header-container"]}>
      <HeaderLogo />

      <div className={headerStyles["header-nav"]}>
        <div className={`${headerStyles["header-nav-list"]} ${isOpen ? headerStyles.open : ""}`}>
          <HeaderNavItem to="https://aud.ibr.cs.tu-bs.de" text="TreeTutor" />
          <div className={headerStyles["dropdown"]}>
            <HeaderNavItem to="/mergesort" text="SortSensei ▼" />
            <div className={headerStyles["dropdown-content"]}>
              <HeaderNavItem to="/mergesort" text="Mergesort" />
              <HeaderNavItem to="/quicksort" text="Quicksort" />
              <HeaderNavItem to="/bubblesort" text="Bubblesort" />
              <HeaderNavItem to="/selectionsort" text="Selectionsort" />
            </div>
          </div>
          <HeaderNavItem to="https://aud.ibr.cs.tu-bs.de" text="Kontakt" />
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

export default Header;
