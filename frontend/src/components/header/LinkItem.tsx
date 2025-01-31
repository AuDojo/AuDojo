import { JSX, Suspense } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../ui/spinner";
import headerStyle from "./Header.module.css";

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
      <Suspense fallback={<Spinner size="sm" />}>{icon}</Suspense>
    </Link>
  );
};

export default LinkItem;
