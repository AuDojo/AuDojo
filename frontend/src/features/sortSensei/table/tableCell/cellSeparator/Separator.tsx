import styles from "./Separator.module.css";
import classNames from "classnames/bind";
import { useState } from "react";

/**
 * A separator component that displays a line with a hoverable checkmark.
 * The separator changes its style when the checkmark is clicked.
 */
const cx = classNames.bind(styles);
const Separator = ({ isMarked, setIsMarked }: { isMarked: boolean; setIsMarked: (isMarked: boolean) => void }) => {
  // Keep track of the number of times the separator has been clicked
  const [separatorCount, setSeparatorCount] = useState(0);

  /**
   * If the separator is not marked, mark it.
   * Increment the separator count modulo 4 to change the separator style (0-normal, 1-big, 2-medium, 3-small).
   */
  const handleClick = () => {
    if (!isMarked) {
      setIsMarked(true);
    }
    setSeparatorCount((separatorCount + 1) % 4);
  };

  return (
    <div className={cx("cell-separator")}>
      <div className={cx(`c${separatorCount}`, { marked: isMarked })}></div>
      <div className={cx("hover-checkmark")} onClick={handleClick}></div>
    </div>
  );
};
export default Separator;
