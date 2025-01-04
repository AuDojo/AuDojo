import { Link } from "react-router-dom";
import footerStyles from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={footerStyles["footer-content"]}>
      <div>
        <Link className="Link" to="/impressum">
          Impressum
        </Link>
      </div>
      <div>
        <Link className="Link" to="/datenschutz">
          Datenschutz
        </Link>
      </div>
    </div>
  );
};

export default Footer;
