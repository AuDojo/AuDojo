import { Link } from "react-router-dom";
import styles from "./HomeButtons.module.css";

interface HomeButtonProps {
  link: string;
  header: string;
  img: string;
  text: string;
  disabled?: boolean;
}

const HomeButton = ({ link, header, img, text, disabled = false }: HomeButtonProps) => {
  if (disabled) {
    return (
      <div className={styles["home-button-link"]}>
        <div className={styles["home-button-header"]}>{header}</div>
        <div className={styles["disabled-container"]}>
          <img className={styles["disabled-img"]} src={img} alt="Sorting animation" />
          <div className={styles["disabled-overlay"]}>
            <span>Coming Soon...</span>
          </div>
        </div>
        <div className={styles["home-button-text"]}>{text}</div>
      </div>
    );
  }
  return (
    <Link to={link} className={styles["home-button-link"]}>
      <div className={styles["home-button-header"]}>{header}</div>
      <img className={styles["home-button-img"]} src={img} alt="Sorting animation" />
      <div className={styles["home-button-text"]}>{text}</div>
    </Link>
  );
};

export default HomeButton;
