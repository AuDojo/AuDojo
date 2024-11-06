import { useState } from "react";
import { Link } from "react-router-dom";
import audojoLogo from "../../assets/logo-audojo.png";
import headerStyles from "../../styles/sortSensei/SortHeader.module.css";

const HeaderNavItem = ({ to, text, activeSort, onClick }: { to: string; text: string; activeSort: boolean; onClick: () => void }) => {
  return (
    <Link className="Link" to={to} onClick={onClick}>
      <div className={`${headerStyles["header-nav-list-item"]} ${activeSort ? headerStyles["header-nav-list-item-active"] : ""}`}>{text}</div>
    </Link>
  );
};

const SortHeader = () => {
  const [activeSort, setActiveSort] = useState<string>("mergesort");

  return (
    <div className={headerStyles["header-container"]}>
      <Link to={"/"}>
        <div className={headerStyles["header-logo-container"]}>
          <div className={headerStyles["header-logo-text"]}>AUDOJO</div>
          <img className={headerStyles["header-logo-image"]} src={audojoLogo} alt="audojo logo" />
        </div>
      </Link>

      <div className={headerStyles["header-nav"]}>
        <div className={`${headerStyles["header-nav-list"]}`}>
          <HeaderNavItem 
            activeSort={activeSort === "mergesort"} 
            onClick={() => setActiveSort("mergesort")} 
            to="/mergesort" 
            text="Mergesort" 
          />

          <HeaderNavItem 
            activeSort={activeSort === "quicksort"} 
            onClick={() => setActiveSort("quicksort")} 
            to="/quicksort" 
            text="Quicksort" 
          />

          <HeaderNavItem 
            activeSort={activeSort === "bubblesort"} 
            onClick={() => setActiveSort("bubblesort")} 
            to="/bubblesort" 
            text="Bubblesort" 
          />

          <HeaderNavItem 
            activeSort={activeSort === "selectionsort"} 
            onClick={() => setActiveSort("selectionsort")} 
            to="/selectionsort" 
            text="Selectionsort" 
          />
        </div>
      </div>
    </div>
  );
};

export default SortHeader;
