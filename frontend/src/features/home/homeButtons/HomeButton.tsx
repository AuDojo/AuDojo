import { Link } from "react-router-dom";
import styles from "./HomeButtons.module.css";
import { ReactNode } from "react";

interface HomeButtonProps {
  link: string;
  header: string;
  img: string | ReactNode;
  text: string;
}

const HomeButton = ({ link, header, img, text }: HomeButtonProps) => {
  return (
    <Link to={link} className={styles["home-button-link"]}>
      <h2 className={styles["home-button-header"]}>{header}</h2>
      {typeof img === "string" ? (
        <img className={styles["home-button-img"]} src={img} alt={`${header} illustration`} />
      ) : (
        img
      )}
      {/* <img className={styles["home-button-img"]} src={img} alt={`${header} illustration`} />
      <div></div> */}
      <p className={styles["home-button-text"]}>{text}</p>
    </Link>
  );
};

export default HomeButton;
