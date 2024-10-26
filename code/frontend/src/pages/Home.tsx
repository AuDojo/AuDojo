import Footer from "../components/homepage/Footer";
import Header from "../components/homepage/Header";
import HomeButtonList from "../components/homepage/HomeButtonList";
// import "../styles/homepage/Footer.css";
// import "../styles/homepage/Header.css";
import mainStyles from "../styles/homepage/Main.module.css";
import headerStyles from "../styles/homepage/Header.module.css";
const Home = () => {
  return (
    <>
      <header className={headerStyles.header}>
        <Header />
      </header>
      <main className={mainStyles.main}>
        <h1 className={mainStyles["main-header"]}>AuDojo ⛩️</h1>
        <p className={mainStyles["main-welcome-message"]}>
          Willkommen bei AuDojo! Dein Dojo für Algorithmen und Datenstrukturen
        </p>
        <HomeButtonList />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
