import style from "./HamugerIcon.module.css";
const HamburgerIcon = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <div className={`${style["hamburger"]} ${isOpen ? style.change : ""}`} onClick={onClick}>
      <div className={style["bar1"]}></div>
      <div className={style["bar2"]}></div>
      <div className={style["bar3"]}></div>
    </div>
  );
};

export default HamburgerIcon;
