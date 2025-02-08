import audoLogo from "@/assets/logo-audojo.png";
import { HomeButtons } from "@/features/homepage/homeButtons";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Home.module.css";

const Home = () => {
  useEffect(() => {
    document.title = "AuDojo";
  }, []);

  const { t } = useTranslation("home");

  return (
    <>
      <h1 className={styles["main-header"]}>
        <div>AuDojo</div>
        <img className={styles["audojo-logo"]} src={audoLogo} alt="logo of audojo" />
      </h1>
      <p className={styles["main-welcome-message"]}>{t("welcomeMessage")}</p>
      <HomeButtons />
    </>
  );
};

export default Home;
