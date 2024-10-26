import tubsLogo from "../../assets/tu-logo.png";

const HeaderLogo = () => {
  return (
    <a href={"https://aud.ibr.cs.tu-bs.de"} target="_blank">
      <div className="header-logo-container">
        <img className="header-logo-image" src={tubsLogo} alt="logo of TU Braunssweig" />
        <div className="header-logo-text">Algorithmen und Datenstrukturen</div>
      </div>
    </a>
  );
};
export default HeaderLogo;
