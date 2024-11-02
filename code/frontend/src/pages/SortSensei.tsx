import { Outlet } from "react-router-dom";
import Header from "../components/sortSensei/Header";
import styles from "../styles/sortSensei/general.module.css";

const SortSensei = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
    </div>
  );
};
export default SortSensei;
