import { Link } from "react-router-dom";
import mainStyles from "../../styles/homepage/Main.module.css";

interface HomeButtonProps {
  header: string;
  img: string;
  text: string;
}

const HomeButton = ({ header, img, text }: HomeButtonProps) => {
  return (
    <Link to="/" className={mainStyles["home-button-link"]}>
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
