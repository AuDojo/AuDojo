import { paths } from "@/constants";
import sortingPng from "./assets/sorting.png";
import treePng from "./assets/tree.png";
import HomeButton from "./HomeButton";
import styles from "./HomeButtons.module.css";

const HomeButtons = () => {
  return (
    <>
      <div className={styles["home-buttons-container"]}>
        <HomeButton link={paths.mergeSort} header="Sort Sensei" img={sortingPng} text="Sortier-Algorithmen" />
        <HomeButton link={paths.home} header="Tree Tutor" img={treePng} text="AVL-Baum-Operationen" />
      </div>
    </>
  );
};

export default HomeButtons;
