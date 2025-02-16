import { Spinner } from "@/components/ui/spinner";
import { JSX, Suspense } from "react";
import { Link } from "react-router-dom";

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
    <Link className={className} to={to}>
      {text}
      <Suspense fallback={<Spinner size="sm" />}>{icon}</Suspense>
    </Link>
  );
};

export default LinkItem;
