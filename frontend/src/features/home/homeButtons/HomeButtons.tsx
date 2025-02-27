import { paths } from "@/config/paths";
import { useTranslation } from "react-i18next";
// import sortingPng from "./assets/sorting.png";
import HomeButton from "./HomeButton";
import styles from "./HomeButtons.module.css";
import Sorting from "./assets/Sorting";
import AVLTree from "./assets/AVLTree";

const HomeButtons = () => {
  const { t } = useTranslation("home");
  return (
    <>
      <div className={styles["home-buttons-container"]}>
        {/* <HomeButton link={paths.mergeSort} header="Sort Sensei" img={sortingPng} text={t("sortSenseiButton")} /> */}
        {/* <HomeButton link={paths.treeTutor} header="Tree Tutor" img={treePng} text={t("treetutorButton")} /> */}
        <HomeButton link={paths.mergeSort} header="Sort Sensei" img={<Sorting />} text={t("sortSenseiButton")} />
        <HomeButton link={paths.treeTutor} header="Tree Tutor" img={<AVLTree />} text={t("treetutorButton")} />
      </div>
    </>
  );
};

export default HomeButtons;
