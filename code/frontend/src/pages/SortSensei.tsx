import { Outlet } from "react-router-dom";
import SortHeader from "../components/sortSensei/SortHeader";
import styles from "../styles/sortSensei/general.module.css";

const SortSensei = () => {
  return (
    <div className={styles.container}>
      <SortHeader />
      <Outlet />
    </div>
  );
};
export default SortSensei;
