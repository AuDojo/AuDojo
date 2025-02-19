import { Spinner } from "@/components/ui/spinner";
import styles from "./Loading.module.css";

const LoadingComponent = () => (
  <div className={styles["loading-container"]}>
    <Spinner size="xl" />
  </div>
);

export default LoadingComponent;
