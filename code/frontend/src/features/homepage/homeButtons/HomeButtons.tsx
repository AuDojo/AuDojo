import sortingPng from "@assets/sorting.png";
import treePng from "@assets/tree.png";
import HomeButton from "./HomeButton";
import styles from "./HomeButtons.module.css";
import { useTranslation } from "react-i18next";

const HomeButtons = () => {
    const { t, i18n } = useTranslation();
  return (
    <>
      <div className={styles["home-buttons-container"]}>
        <HomeButton link="/mergesort" header="Sort Sensei" img={sortingPng} text={t("home-sortSenseiButton")} />
        <HomeButton link="/" header="Tree Tutor" img={treePng} text={t("home-treetutorButton")} />
      </div>
    </>
  );
};

export default HomeButtons;
