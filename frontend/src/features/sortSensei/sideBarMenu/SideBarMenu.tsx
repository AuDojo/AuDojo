import { paths } from "@/config";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./SideBarMenu.module.css";

const NavItem = ({
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
    <Link to={to} onClick={onClick}>
      <div className={`${styles["sort-nav-list-item"]} ${activeSort ? styles["sort-nav-list-item-active"] : ""}`}>
        {text}
      </div>
    </Link>
  );
};

const SideBarMenu = () => {
  const location = useLocation();
  const currentSort = location.pathname.replace("/", "") || "mergesort"; // get the current path name
  const [activeSort, setActiveSort] = useState<string>(currentSort);

  return (
    <>
      <div className={styles["sort-nav"]}>
        <div className={`${styles["sort-nav-list"]}`}>
          <NavItem
            activeSort={activeSort === "mergesort"}
            onClick={() => setActiveSort("mergesort")}
            to={paths.mergeSort}
            text="MergeSort"
          />

          <NavItem
            activeSort={activeSort === "quicksort"}
            onClick={() => setActiveSort("quicksort")}
            to={paths.quickSort}
            text="QuickSort"
          />
          <NavItem
            activeSort={activeSort === "bubblesort"}
            onClick={() => setActiveSort("bubblesort")}
            to={paths.bubbleSort}
            text="BubbleSort"
          />

          <NavItem
            activeSort={activeSort === "selectionsort"}
            onClick={() => setActiveSort("selectionsort")}
            to={paths.selectionSort}
            text="SelectionSort"
          />
        </div>
      </div>
    </>
  );
};

export default SideBarMenu;
