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

//defaultpath is default path, to which is nagivated upon visiting e.g. "SortSensei" or "Treetutor".
//navipath_map is a collection of {sidebar name, its path} used in navigation sidebar.
//e.g. {"MergeSort","/tutorial/mergesort"} : "Mergesort" navigation button leads to /tutorial/mergesort website
const TutorialNavigation = ({
  defaultpath,
  navipath_map,
}: {
  defaultpath: string;
  navipath_map: { title: string; path: string }[];
}) => {
  const location = useLocation();
  console.log(location.pathname);
  const currentMode = location.pathname || defaultpath;
  console.log("currentMode: " + currentMode); // get the current path name
  const [activeMode, setActiveMode] = useState<string>(currentMode);
  console.log("activeMode: " + activeMode);

  return (
    <aside className={styles["navi-container"]}>
      <nav className={styles["navi-button"]}>
        {navipath_map.map(({ title, path }) => (
          <NavItem activeTutorial={activeMode === path} onClick={() => setActiveMode(path)} to={path} text={title} />
        ))}
        {/* <NavItem
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
        /> */}
      </nav>
    </aside>
  );
};

export default TutorialNavigation;
