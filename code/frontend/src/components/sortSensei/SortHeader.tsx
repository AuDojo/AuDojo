
import audojoLogo from "../../assets/logo-audojo.png";
import { Link } from "react-router-dom";
import headerStyles from "../../styles/sortSensei/SortHeader.module.css";
const HeaderNavItem = ({ to, text }: { to: string; text: string }) => {
  return (
    <Link className="Link" to={to}>
      <div className={`${headerStyles["header-nav-list-item"]} ${to.includes("mergesort") && headerStyles["header-nav-list-item-active"]}`}>{text}</div>
    </Link>
  );
};
const SortHeader = () => {
  // const [active]
  return (
    <div className={headerStyles["header-container"]}>
      <Link to={"/"}>
        <div className={headerStyles["header-logo-container"]}>
          <img className={headerStyles["header-logo-image"]} src={audojoLogo} alt="audojo logo" />
          <div className={headerStyles["header-logo-text"]}>AUDOJO</div>
        </div>
      </Link>

      <div className={headerStyles["header-nav"]}>
        <div className={`${headerStyles["header-nav-list"]}`}>
          <HeaderNavItem to="/sortsensei/mergesort" text="Mergesort" />
          <HeaderNavItem to="/sortsensei" text="Quicksort" />
          <HeaderNavItem to="https://aud.ibr.cs.tu-bs.de" text="Bubblesort" />
        </div>
      </div>
    </div>
  );
};

export default SortHeader;
