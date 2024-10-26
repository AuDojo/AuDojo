import audoLogo from "../../assets/logo-audojo.png";
import footerStyles from "../../styles/homepage/Footer.module.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className={footerStyles["footer-content"]}>
      <div>
        <Link className="Link" to="">
          Impressum
        </Link>
      </div>
      <div>
        <Link className="Link" to="">
          Datenschutz
        </Link>
      </div>
      <Link className="Link" to="">
        <div className={footerStyles["footer-audojo"]}>
          <div>Created by </div>
          <img className={footerStyles["footer-audojo-logo"]} src={audoLogo} alt="logo of audojo" />
        </div>
      </Link>
    </div>
  );
};

export default Footer;
