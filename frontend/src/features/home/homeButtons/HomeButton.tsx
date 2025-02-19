import { Link } from "react-router-dom";
import styles from "./HomeButtons.module.css";

interface HomeButtonProps {
  link: string;
  header: string;
  img: string;
  text: string;
}

const HomeButton = ({ link, header, img, text }: HomeButtonProps) => {
  return (
    <Link to={link} className={styles["home-button-link"]}>
      <h2 className={styles["home-button-header"]}>{header}</h2>
      <img className={styles["home-button-img"]} src={img} alt={`${header} illustration`} />
      <p className={styles["home-button-text"]}>{text}</p>
    </Link>
  );
};

export default HomeButton;
