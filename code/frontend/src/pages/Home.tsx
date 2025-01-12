import audoLogo from "@assets/logo-audojo.png";
import { HomeButtons } from "@features/homepage/homeButtons";
import styles from "@styles/homepage/Main.module.css";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "AuDojo";
  }, []);

  return (
    <>
      <h1 className={styles["main-header"]}>
        <div>AuDojo</div>
        <img className={styles["audojo-logo"]} src={audoLogo} alt="logo of audojo" />
      </h1>
      <p className={styles["main-welcome-message"]}>
        Willkommen bei AuDojo! Dein Dojo für Algorithmen und Datenstrukturen
      </p>
      <HomeButtons />
    </>
  );
};

export default Home;
