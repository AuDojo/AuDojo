import sortingPng from "../../assets/sorting.png";
import treePng from "../../assets/tree.png";
import mainStyles from "../../styles/homepage/Main.module.css";
import HomeButton from "./HomeButton";

const HomeButtonList = () => {
  return (
    <>
      <div className={mainStyles["home-buttons-container"]}>
        <HomeButton
          link="/sortsensei/mergesort"
          header="Sort Sensei"
          img={sortingPng}
          text="Sortier-Algorithmen"
        />
        <HomeButton
          link="/"
          header="Tree Tutor"
          img={treePng}
          text="AVL-Baum-Operationen"
        />
      </div>
    </>
  );
};

export default HomeButtonList;
