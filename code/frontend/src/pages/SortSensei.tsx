import { Outlet } from "react-router-dom";
import Header from "../components/sortSensei/Header";
import { SortProvider } from "../contexts/SortContext";
import styles from "../styles/sortSensei/general.module.css";

const SortSensei = () => {
  return (
    <SortProvider>
      <div className={styles.container}>
        <Header />
        <Outlet />
      </div>
    </SortProvider>
  );
};
export default SortSensei;
