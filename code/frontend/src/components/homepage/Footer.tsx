import React from "react";
import audoLogo from "../../assets/logo-audojo.png";
import "../../styles/homepage/Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer-content">
      <div>
        <Link className="no-underline" to="">
          Impressum
        </Link>
      </div>
      <div>
        <Link className="no-underline" to="">
          Datenschutz
        </Link>
      </div>
      <Link className="no-underline" to="">
        <div className="footer-audojo-logo">
          <div>designed by</div>
          <img style={{ height: "50px", borderRadius: "50%" }} src={audoLogo} alt="logo of audojo" />
        </div>
      </Link>
    </div>
  );
};

export default Footer;
