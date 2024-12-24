import styles from "@styles/sortSensei/Tooltip.module.css";
import classNames from "classnames";
import React, { useState } from "react";

interface TooltipProps {
  delay?: number;
  direction?: "top" | "right" | "bottom" | "left"; // Tooltip direction options
  hidden?: boolean; // Tooltip visibility
  content: React.ReactNode; // Content of the tooltip
  children: React.ReactElement | string; // Child element that triggers the tooltip
}

const Tooltip = ({ delay = 500, direction = "top", hidden = false, content, children }: TooltipProps) => {
  let timeout: NodeJS.Timeout;
  const [active, setActive] = useState<boolean>(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 200);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  if (hidden) {
    return <>{children}</>;
  }

  return (
    <div
      className={styles["Tooltip-Wrapper"]} // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && <div className={classNames(styles["Tooltip-Tip"], styles[direction])}>{content}</div>}
    </div>
  );
};

export default Tooltip;
