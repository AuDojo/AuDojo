import classNames from "classnames/bind";
import React from "react";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  children: React.ReactNode;
}

const cx = classNames.bind(styles);

/**
 * A Tooltip component that displays a tooltip with the specified content.
 * The tooltip appears in the specified position with an optional delay.
 *
 * @param content - The text content to display inside the tooltip.
 * @param position - The position of the tooltip relative to the child element. Defaults to "top".
 * @param delay - The delay in milliseconds before the tooltip appears. Defaults to 200ms
 */
const Tooltip = ({ content, position = "top", delay = 200, children }: TooltipProps) => {
  return (
    <div
      aria-label={content}
      data-tooltip={position}
      style={{ transitionDelay: `${delay}ms` }}
      className={cx("tooltip-container")}
    >
      {children}
    </div>
  );
};

export default Tooltip;
