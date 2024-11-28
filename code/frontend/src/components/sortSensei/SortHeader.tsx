import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import audojoLogo from "../../assets/logo-audojo.png";
import headerStyles from "../../styles/sortSensei/SortHeader.module.css";

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
      <div className={`${headerStyles["header-nav-list"]} ${isOpen ? headerStyles.open : ""}`}>
        <HeaderNavItem to="https://aud.ibr.cs.tu-bs.de" text="TreeTutor" />
        <div className={headerStyles["dropdown"]}>
          <HeaderNavItem to="/mergesort" text="SortSensei ▼" />
          <div className={headerStyles["dropdown-content"]}>
            <HeaderNavItem to="/mergesort" text="MergeSort" />
            <HeaderNavItem to="/quicksort" text="QuickSort" />
            <HeaderNavItem to="/bubblesort" text="BubbleSort" />
            <HeaderNavItem to="/selectionsort" text="SelectionSort" />
          </div>
        </div>
        <HeaderNavItem to="https://aud.ibr.cs.tu-bs.de" text="Kontakt" />
        <HeaderNavItem to="/tutorial" text="Hilfe & Beispiele" />
      </div>

      <div className={`${headerStyles["hamburger"]} ${isOpen ? headerStyles.change : ""}`} onClick={toogleMenu}>
        <div className={headerStyles["bar1"]}></div>
        <div className={headerStyles["bar2"]}></div>
        <div className={headerStyles["bar3"]}></div>
      </div>
    </div>
  );
};
const SortHeaderNavItem = ({
  to,
  text,
  activeSort,
  onClick,
}: {
  to: string;
  text: string;
  activeSort: boolean;
  onClick: () => void;
}) => {
  return (
    <Link className="Link" to={to} onClick={onClick}>
      <div
        className={`${headerStyles["sort-nav-list-item"]} ${
          activeSort ? headerStyles["sort-nav-list-item-active"] : ""
        }`}
      >
        {text}
      </div>
    </Link>
  );
};

const SortHeader = () => {
  const location = useLocation();
  const currentSort = location.pathname.replace("/", "") || "mergesort"; // get the current path name
  const [activeSort, setActiveSort] = useState<string>(currentSort);

  return (
    <>
      <div className={headerStyles["header-container"]}>
        <Link to={"/"}>
          <div className={headerStyles["header-logo-container"]}>
            <div className={headerStyles["header-logo-text"]}>AUDOJO</div>
            <img className={headerStyles["header-logo-image"]} src={audojoLogo} alt="audojo logo" />
          </div>
        </Link>
        <HeaderNavItems />
      </div>

      <div className={headerStyles["sort-nav"]}>
        <div className={`${headerStyles["sort-nav-list"]}`}>
          <SortHeaderNavItem
            activeSort={activeSort === "mergesort"}
            onClick={() => setActiveSort("mergesort")}
            to="/mergesort"
            text="MergeSort"
          />

          <SortHeaderNavItem
            activeSort={activeSort === "quicksort"}
            onClick={() => setActiveSort("quicksort")}
            to="/quicksort"
            text="QuickSort"
          />
          <SortHeaderNavItem
            activeSort={activeSort === "bubblesort"}
            onClick={() => setActiveSort("bubblesort")}
            to="/bubblesort"
            text="BubbleSort"
          />

          <SortHeaderNavItem
            activeSort={activeSort === "selectionsort"}
            onClick={() => setActiveSort("selectionsort")}
            to="/selectionsort"
            text="SelectionSort"
          />
        </div>
      </div>
    </>
  );
};

export default SortHeader;
