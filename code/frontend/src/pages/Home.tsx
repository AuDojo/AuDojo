import audoLogo from "@assets/logo-audojo.png";
import { Footer } from "@components/footer";
import { Header } from "@components/header";
import { HomeButtons } from "@features/homepage/homeButtons";
import generalStyles from "@styles/homepage/general.module.css";
import mainStyles from "@styles/homepage/Main.module.css";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "AuDojo";
  }, []);

  return (
    <div className={generalStyles.container}>
      <header>
        <Header />
      </header>
      <main className={mainStyles.main}>
        <h1 className={mainStyles["main-header"]}>
          <div>AuDojo</div>
          <img className={mainStyles["audojo-logo"]} src={audoLogo} alt="logo of audojo" />
        </h1>
        <p className={mainStyles["main-welcome-message"]}>
          Willkommen bei AuDojo! Dein Dojo für Algorithmen und Datenstrukturen
        </p>
        <HomeButtons />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
