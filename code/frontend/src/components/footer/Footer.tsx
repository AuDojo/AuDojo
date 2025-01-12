import { paths } from "@/constants";
import { Link } from "react-router-dom";
import footerStyles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <Link className={footerStyles["footer-content"]} to={paths.impressum}>
        Impressum
      </Link>

      <Link className={footerStyles["footer-content"]} to={paths.datenschutz}>
        Datenschutz
      </Link>
    </footer>
  );
};

export default Footer;
