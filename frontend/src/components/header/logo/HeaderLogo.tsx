import { paths } from "@/constants";
import { Link } from "react-router-dom";
import audojoLogo from "@assets/logo-audojo-no-rand.png";
import style from "./HeaderLogo.module.css";

const HeaderLogo = () => {
  return (
    <Link className={style["logo-container"]} to={paths.home}>
      <span>AuDojo</span>
      <img src={audojoLogo} />
    </Link>
  );
};
export default HeaderLogo;
