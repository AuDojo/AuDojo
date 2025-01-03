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
      {/* <Link className="Link" to="">
        <div className={footerStyles["footer-audojo"]}>
          <div>Created by </div>
          <img className={footerStyles["footer-audojo-logo"]} src={audoLogo} alt="logo of audojo" />
        </div>
      </Link> */}
    </div>
  );
};

export default Footer;
