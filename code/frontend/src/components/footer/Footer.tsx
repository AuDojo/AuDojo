import { paths } from "@/constants";
import { Link } from "react-router-dom";
import footerStyles from "./Footer.module.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("footer");
  return (
    <footer>
      <Link className={footerStyles["footer-content"]} to={paths.impressum}>
        {t("impressum")}
      </Link>

      <Link className={footerStyles["footer-content"]} to={paths.datenschutz}>
        {t("datenschutz")}
      </Link>
    </footer>
  );
};

export default Footer;
