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
      <div className={styles["home-button-header"]}>{header}</div>
      <img className={styles["home-button-img"]} src={img} alt="Sorting animation" />
      <div className={styles["home-button-text"]}>{text}</div>
    </Link>
  );
};

export default HomeButton;
