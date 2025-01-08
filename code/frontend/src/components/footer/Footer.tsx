import { paths } from "@/constants";
import { Link } from "react-router-dom";
import footerStyles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={footerStyles["footer-content"]}>
      <div>
        <Link className="Link" to={paths.impressum}>
          Impressum
        </Link>
      </div>
      <div>
        <Link className="Link" to={paths.datenschutz}>
          Datenschutz
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
