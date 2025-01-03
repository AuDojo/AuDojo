import audojoLogo from "@assets/logo-audojo.png";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./SortHeader.module.css";

const HeaderNavItem = ({ to, text }: { to: string; text: string }) => {
  return (
    <Link className="Link" to={to}>
      <div className={styles["header-nav-list-item"]}>{text}</div>
    </Link>
  );
};
const HeaderNavItems = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toogleMenu = () => {
    setOpen(!isOpen);
  };
  return (
    <div className={styles["header-nav"]}>
      <div className={`${styles["header-nav-list"]} ${isOpen ? styles.open : ""}`}>
        <div className={styles["dropdown"]}>
          <HeaderNavItem to="/mergesort" text="SortSensei ▼" />
          <div className={styles["dropdown-content"]}>
            <HeaderNavItem to="/mergesort" text="MergeSort" />
            <HeaderNavItem to="/quicksort" text="QuickSort" />
            <HeaderNavItem to="/bubblesort" text="BubbleSort" />
            <HeaderNavItem to="/selectionsort" text="SelectionSort" />
          </div>
        </div>
        <HeaderNavItem to="https://aud.ibr.cs.tu-bs.de" text="TreeTutor" />
        <HeaderNavItem to="https://aud.ibr.cs.tu-bs.de" text="Kontakt" />
      </div>

      <div className={`${styles["hamburger"]} ${isOpen ? styles.change : ""}`} onClick={toogleMenu}>
        <div className={styles["bar1"]}></div>
        <div className={styles["bar2"]}></div>
        <div className={styles["bar3"]}></div>
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
      <div className={`${styles["sort-nav-list-item"]} ${activeSort ? styles["sort-nav-list-item-active"] : ""}`}>
        {text}
      </div>
    </Link>
  );
};

const HilfeButton = ({ to, text }: { to: string; text: string }) => {
  return (
    <Link className="Link" to={to}>
      <div className={styles["help-button"]}>{text}</div>
    </Link>
  );
};

const SortHeader = () => {
  const location = useLocation();
  const currentSort = location.pathname.replace("/", "") || "mergesort"; // get the current path name
  const [activeSort, setActiveSort] = useState<string>(currentSort);

  return (
    <>
      <div className={styles["header-container"]}>
        <Link to={"/"}>
          <div className={styles["header-logo-container"]}>
            <div className={styles["header-logo-text"]}>AUDOJO</div>
            <img className={styles["header-logo-image"]} src={audojoLogo} alt="audojo logo" />
          </div>
        </Link>
        <HeaderNavItems />
      </div>

      <div className={styles["sort-nav"]}>
        <div className={`${styles["sort-nav-list"]}`}>
          <HilfeButton to="/tutorial" text="Beispiele" />

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
