import { paths } from "@/constants";
import sortingPng from "./assets/sorting.png";
import treePng from "./assets/tree.png";
import HomeButton from "./HomeButton";
import styles from "./HomeButtons.module.css";
import { useTranslation } from "react-i18next";

const HomeButtons = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles["home-buttons-container"]}>
        <HomeButton link={paths.mergeSort} header="Sort Sensei" img={sortingPng} text={t("sortSenseiButton")} />
        <HomeButton link={paths.treeTutor} header="Tree Tutor" img={treePng} text={t("treetutorButton")} />
      </div>
    </>
  );
};

export default HomeButtons;
