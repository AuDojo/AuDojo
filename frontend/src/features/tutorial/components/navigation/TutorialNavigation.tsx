import { paths } from "@/config/paths";
import { Link, useLocation } from "react-router-dom";
import styles from "./TutorialNavigation.module.css";
import { useState } from "react";

const NavItem = ({
  to,
  text,
  activeTutorial,
  onClick,
}: {
  to: string;
  text: string;
  activeTutorial: boolean;
  onClick: () => void;
}) => {
  return (
    <Link to={to} onClick={onClick}>
      <div
        className={`${styles[""]} ${activeTutorial ? styles["navi-button-active"] : styles["navi-button-inactive"]}`}
      >
        {text}
      </div>
    </Link>
  );
};

const TutorialNavigation = () => {
  const location = useLocation();
  const currentSort = location.pathname.replace("/", "") || "tutorial/mergesort"; // get the current path name
  const [activeSort, setActiveSort] = useState<string>(currentSort);

  return (
    <aside className={styles["navi-container"]}>
      <nav className={styles["navi-button"]}>
        <NavItem
          activeTutorial={activeSort === "tutorial/mergesort"}
          onClick={() => setActiveSort("tutorial/mergesort")}
          to={paths.mergesorttutorial}
          text="MergeSort"
        />

        <NavItem
          activeTutorial={activeSort === "tutorial/quicksort"}
          onClick={() => setActiveSort("tutorial/quicksort")}
          to={paths.quicksorttutorial}
          text="QuickSort"
        />
        <NavItem
          activeTutorial={activeSort === "tutorial/bubblesort"}
          onClick={() => setActiveSort("tutorial/bubblesort")}
          to={paths.bubblesorttutorial}
          text="BubbleSort"
        />

        <NavItem
          activeTutorial={activeSort === "tutorial/selectionsort"}
          onClick={() => setActiveSort("tutorial/selectionsort")}
          to={paths.selectionsorttutorial}
          text="SelectionSort"
        />
      </nav>
    </aside>
  );
};

export default TutorialNavigation;
