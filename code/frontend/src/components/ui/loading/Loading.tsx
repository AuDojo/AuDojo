import { Spinner } from "@/components/ui/spinner";
import styles from "./Loading.module.css";

const LoadingComponent = () => (
  <div className={styles["loading-container"]}>
    <p>Loading... </p>
    <Spinner size="lg" />
  </div>
);

export default LoadingComponent;
