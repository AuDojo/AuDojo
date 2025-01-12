import { Link } from "react-router-dom";
import footerStyles from "./Footer.module.css";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation("footer");
  return (
    <div className={footerStyles["footer-content"]}>
      <div>
        <Link className="Link" to="/impressum">
          {t("impressum")}
        </Link>
      </div>
      <div>
        <Link className="Link" to="/datenschutz">
          {t("datenschutz")}
        </Link>
      </div>
    </div>
  );
};

export default Footer;
