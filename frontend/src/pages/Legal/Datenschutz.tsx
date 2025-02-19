import styles from "./Legal.module.css";

const Datenschutz = () => {
  return (
    <div className={styles["bureaucratic-container"]}>
      <h1 className={styles["bureaucratic-heading"]}>
        <div>Datenschutzerklärung</div>
      </h1>
      <p>
        Wir freuen uns über Ihr Interesse an unserer Webseite. Der Schutz Ihrer persönlichen Daten ist uns ein
        besonderes Anliegen. Aus diesem Grund informieren wir Sie hier darüber, wie wir mit personenbezogenen Daten
        umgehen.
      </p>
      <h2 className={styles["bureaucratic-subheading"]}>1. Verantwortlicher </h2>
      <div className={styles["bureaucratic-paragraph-container"]}>
        <p>Verantwortlich für die Datenverarbeitung auf dieser Webseite ist</p>
        <p>Max Mustermann </p>
        <p>Musterstraße 23 </p>
        <p> mustermann@web.de</p>
      </div>
      <h2 className={styles["bureaucratic-subheading"]}>2. Erhebung und Verarbeitung personenbezogener Daten </h2>

      <div className={styles["bureaucratic-paragraph-container"]}>
        <p>
          Auf unserer Webseite werden keine personenbezogenen Daten von Ihnen erhoben, gespeichert oder verarbeitet. Es
          werden keine Cookies gesetzt, keine Analysedienste eingesetzt und keine Logfiles erstellt, die Rückschlüsse
          auf Ihre Person zulassen.
        </p>
      </div>
      <h2 className={styles["bureaucratic-subheading"]}> 3. Zweck der Webseite </h2>
      <div className={styles["bureaucratic-paragraph-container"]}>
        <p>Unsere Webseite dient der Bereitstellung von Informationen über [kurze Beschreibung der</p>
      </div>
      <h2 className={styles["bureaucratic-subheading"]}>4. Hosting </h2>
      <div className={styles["bureaucratic-paragraph-container"]}>
        <p>
          Diese Webseite wird bei einem externen Hosting-Dienstleister betrieben. Dabei können technische Daten wie Ihre
          IP-Adresse kurzzeitig verarbeitet werden, um die Webseite bereitzustellen. Diese Daten werden jedoch
          ausschließlich technisch verarbeitet und nicht gespeichert.
        </p>
      </div>
      <h2 className={styles["bureaucratic-subheading"]}> 5. Rechte der betroffenen Personen</h2>

      <div className={styles["bureaucratic-paragraph-container"]}>
        <p>
          Da wir keine personenbezogenen Daten erheben oder verarbeiten, können Sie von uns auch keine Auskunft über
          solche Daten verlangen oder diese berichtigen, löschen oder übertragen lassen. Falls Sie dennoch Fragen haben,
          können Sie uns gerne kontaktieren. Da wir keine personenbezogenen Daten erheben oder verarbeiten, können Sie
          von uns auch keine Auskunft über solche Daten verlangen oder diese berichtigen, löschen oder übertragen
          lassen. Falls Sie dennoch Fragen haben, können Sie uns gerne kontaktieren
        </p>
      </div>
      <h2 className={styles["bureaucratic-subheading"]}>6. Änderungen dieser Datenschutzerklärung</h2>
      <div className={styles["bureaucratic-paragraph-container"]}>
        <p>
          Wir behalten uns das Recht vor, diese Datenschutzerklärung bei Bedarf anzupassen. Bitte prüfen Sie daher
          regelmäßig unsere Datenschutzerklärung, um über Änderungen informiert zu bleiben. Letzte Aktualisierung:
          12.12.2024
        </p>
      </div>
      <p className={styles["bureaucratic-subheading"]}></p>
    </div>
  );
};
export default Datenschutz;
