import styles from "./Separator.module.css";
import classNames from "classnames/bind";
import { useState } from "react";

const cx = classNames.bind(styles);
const Separator = () => {
  const [separatorCount, setSeparatorCount] = useState(0);

  return (
    <div className={cx("cell-separator")}>
      <div className={cx(`c${separatorCount}`)}></div>
      <div className={cx("hover-checkmark")} onClick={() => setSeparatorCount((separatorCount + 1) % 4)}></div>
    </div>
  );
};

export default Separator;
