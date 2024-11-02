import { Outlet } from "react-router-dom";
import SortHeader from "../components/sortSensei/SortHeader";
import { SortProvider } from "../contexts/SortContext";
import styles from "../styles/sortSensei/general.module.css";

const SortSensei = () => {
  return (
    <SortProvider>
      <div className={styles.container}>
        <SortHeader />
        <Outlet />
      </div>
    </SortProvider>
  );
};
export default SortSensei;
