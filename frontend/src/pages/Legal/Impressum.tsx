import styles from "./Legal.module.css";

const Impressum = () => {
  return (
    <div className={styles["bureaucratic-container"]}>
      <h1 className={styles["bureaucratic-heading"]}>
        <div>Impressum</div>
      </h1>
      <h2 className={styles["bureaucratic-subheading"]}> Angaben gemäß § 5 TMG </h2>
      <div className={styles["bureaucratic-paragraph-container"]}>
        <p>Institut für Betriebssysteme und Rechnerverbund</p>
        <p> Informatikzentrum, </p>
        <p> Mühlenpfordstraße 23</p>
      </div>
      <h2 className={styles["bureaucratic-subheading"]}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV </h2>

      <div className={styles["bureaucratic-paragraph-container"]}>
        <p>
          <p>Max Mustermann</p>
          <p> Informatikzentrum, </p>
          <p> Mühlenpfordstraße 23</p>
        </p>
      </div>
      <h2 className={styles["bureaucratic-subheading"]}> Verbraucherstreitbeteilung </h2>
      <div className={styles["bureaucratic-paragraph-container"]}>
        <p>
          Wir verkaufen keine Produkte oder Dienstleistungen über unsere Webseite. Daher sind wir weder bereit noch
          verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>
    </div>
  );
};

export default Impressum;
