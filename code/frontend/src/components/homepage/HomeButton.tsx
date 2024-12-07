import mainStyles from "@styles/homepage/Main.module.css";
import { Link } from "react-router-dom";

interface HomeButtonProps {
  link: string;
  header: string;
  img: string;
  text: string;
}

const HomeButton = ({ link, header, img, text }: HomeButtonProps) => {
  return (
    <Link to={link} className={mainStyles["home-button-link"]}>
      <div className={mainStyles["home-button-header"]}>{header}</div>
      <img
        className={mainStyles["home-button-img"]}
        src={img}
        alt="Sorting animation"
      />
      <div className={mainStyles["home-button-text"]}>{text}</div>
    </Link>
  );
};

export default HomeButton;
