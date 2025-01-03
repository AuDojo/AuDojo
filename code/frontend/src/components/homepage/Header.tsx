import headerStyles from "@styles/homepage/Header.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import HeaderLogo from "./HeaderLogo";
const HeaderNavItem = ({ to, text }: { to: string; text: string }) => {
  return (
    <Link className="Link" to={to}>
      <div className={headerStyles["header-nav-list-item"]}>{text}</div>
    </Link>
  );
};
const HeaderNavItems = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toogleMenu = () => {
    setOpen(!isOpen);
  };
  return (
    <div className={headerStyles["header-nav"]}>
      <div
        className={`${headerStyles["header-nav-list"]} ${
          isOpen ? headerStyles.open : ""
        }`}
      >
        <div className={headerStyles["dropdown"]}>
          <HeaderNavItem to="/mergesort" text="SortSensei ▼" />
          <div className={headerStyles["dropdown-content"]}>
            <HeaderNavItem to="/mergesort" text="MergeSort" />
            <HeaderNavItem to="/quicksort" text="QuickSort" />
            <HeaderNavItem to="/bubblesort" text="BubbleSort" />
            <HeaderNavItem to="/selectionsort" text="SelectionSort" />
          </div>
        </div>
        <HeaderNavItem to="https://aud.ibr.cs.tu-bs.de" text="TreeTutor" />
        <HeaderNavItem to= "/kontakt" text="Kontakt" />
      </div>

      <div
        className={`${headerStyles["hamburger"]} ${
          isOpen ? headerStyles.change : ""
        }`}
        onClick={toogleMenu}
      >
        <div className={headerStyles["bar1"]}></div>
        <div className={headerStyles["bar2"]}></div>
        <div className={headerStyles["bar3"]}></div>
      </div>
    </div>
  );
};
const Header = () => {
  return (
    <div className={headerStyles["header-container"]}>
      <HeaderLogo />
      <HeaderNavItems />
    </div>
  );
};

export default Header;
