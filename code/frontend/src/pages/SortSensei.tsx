import { Outlet } from "react-router-dom";
import AnimationSort from "../components/sortSensei/AnimationSort";
import Header from "../components/sortSensei/Header";
const SortSensei = () => {
  return (
    <>
      <Header />
      <AnimationSort />
      <Outlet />
    </>
  );
};
export default SortSensei;
