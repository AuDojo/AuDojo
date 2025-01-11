import { Link } from "react-router-dom";
import { JSX } from "react";
import headerStyle from "./Header2.module.css";

const LinkItem = ({
  className,
  to,
  text,
  icon,
}: {
  className: string;
  to: string;
  text: string;
  icon?: JSX.Element;
}) => {
  return (
    <Link className={headerStyle[className]} to={to}>
      {text}
      {icon}
    </Link>
  );
};

export default LinkItem;
