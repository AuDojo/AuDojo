import { Outlet } from "react-router-dom";
import Header from "../components/sortSensei/Header";
import "../styles/sortSensei/general.css";
const SortSensei = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default SortSensei;
