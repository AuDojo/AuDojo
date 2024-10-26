import { useState } from "react";
import HeaderLogo from "./HeaderLogo";
import HeaderNavItem from "./HeaderNavItem";

const Header = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const toogleMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="header-content">
      <HeaderLogo />

      <div className="header-nav">
        <div className={`header-nav-list ${isOpen ? "open" : ""}`}>
          <HeaderNavItem to="https://aud.ibr.cs.tu-bs.de" text="TreeTutor" />
          <HeaderNavItem to="https://aud.ibr.cs.tu-bs.de" text="SortSensei ▼" />
          <HeaderNavItem to="https://aud.ibr.cs.tu-bs.de" text="Kontakt" />
        </div>

        <div className={`hamburger ${isOpen ? "change" : ""}`} onClick={toogleMenu}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
