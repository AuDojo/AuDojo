import tubsLogo from "../../assets/tu-logo.png";
import headerStyles from "../../styles/homepage/Header.module.css";
const HeaderLogo = () => {
    return (<a href={"https://aud.ibr.cs.tu-bs.de"} target="_blank">
      <div className={headerStyles["header-logo-container"]}>
        <img className={headerStyles["header-logo-image"]} src={tubsLogo} alt="logo of TU Braunssweig"/>
        <div className={headerStyles["header-logo-text"]}>Algorithmen und Datenstrukturen</div>
      </div>
    </a>);
};
export default HeaderLogo;
