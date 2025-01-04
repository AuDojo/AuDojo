import { Header } from "@src/components/header";
import { Footer } from "@src/components/footer";
import generalStyles from "@styles/homepage/general.module.css";
import mainStyles from "@styles/homepage/Main.module.css";

const Impressum = () => {
  return (
    <div className={generalStyles.container}>
      <header>
        <Header />
      </header>
      <div className={mainStyles["bureaucratic-container"]}>
        <h1 className={mainStyles["bureaucratic-heading"]}>
          <div>Impressum</div>
        </h1>
        <h2 className={mainStyles["bureaucratic-subheading"]}> Angaben gemäß § 5 TMG </h2>
        <div className={mainStyles["bureaucratic-paragraph-container"]}>
          <p>Institut für Betriebssysteme und Rechnerverbund</p>
          <p> Informatikzentrum, </p>
          <p> Mühlenpfordstraße 23</p>
        </div>
        <h2 className={mainStyles["bureaucratic-subheading"]}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV </h2>

        <div className={mainStyles["bureaucratic-paragraph-container"]}>
          <p>
            <p>Max Mustermann</p>
            <p> Informatikzentrum, </p>
            <p> Mühlenpfordstraße 23</p>
          </p>
        </div>
        <h2 className={mainStyles["bureaucratic-subheading"]}> Verbraucherstreitbeteilung </h2>
        <div className={mainStyles["bureaucratic-paragraph-container"]}>
          <p>
            Wir verkaufen keine Produkte oder Dienstleistungen über unsere Webseite. Daher sind wir weder bereit noch
            verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Impressum;