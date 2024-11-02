import { Link } from "react-router-dom";
import headerStyles from "../../styles/homepage/Header.module.css";
const HeaderNavItem = ({ to, text }) => {
    return (<Link className="Link" to={to}>
      <div className={headerStyles["header-nav-list-item"]}>{text}</div>
    </Link>);
};
export default HeaderNavItem;
