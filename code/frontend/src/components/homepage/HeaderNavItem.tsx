import { Link } from "react-router-dom";

const HeaderNavItem = ({ to, text }: { to: string; text: string }) => {
  return (
    <Link className="Link" to={to}>
      <div className="header-nav-list-item">{text}</div>
    </Link>
  );
};

export default HeaderNavItem;
