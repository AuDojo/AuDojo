import { paths } from "@/config/paths";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles["not-found-container"]}>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to={paths.home} replace>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
