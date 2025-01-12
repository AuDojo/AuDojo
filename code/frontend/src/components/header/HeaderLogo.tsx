import tubsLogo from "@assets/tu-logo.png";
import headerStyles from "./Header.module.css";
import { useTranslation } from "react-i18next";
const HeaderLogo = () => {
  const { t } = useTranslation("header");
  return (
    <a href={"https://aud.ibr.cs.tu-bs.de"} target="_blank">
      <div className={headerStyles["header-logo-container"]}>
        <img className={headerStyles["header-logo-image"]} src={tubsLogo} alt="logo of TU Braunssweig" />
        <div className={headerStyles["header-logo-text"]}>{t("logo")}</div>
      </div>
    </a>
  );
};
export default HeaderLogo;
