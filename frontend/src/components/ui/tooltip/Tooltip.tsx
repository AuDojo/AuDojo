import classNames from "classnames";
import cnBind from "classnames/bind";
import React from "react";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

const cx = cnBind.bind(styles);

/**
 * A Tooltip component that displays a tooltip with the specified content.
 * The tooltip appears in the specified position with an optional delay.
 *
 * @param content - The text content to display inside the tooltip.
 * @param position - The position of the tooltip relative to the child element. Defaults to "top".
 * @param className - Optional CSS classes
 * @param delay - The delay in milliseconds before the tooltip appears. Defaults to 200ms
 */
const Tooltip = ({ content, position = "top", delay = 200, className = "", children }: TooltipProps) => {
  return (
    <div
      aria-label={content}
      data-tooltip={position}
      style={{ transitionDelay: `${delay}ms` }}
      className={classNames(cx("tooltip-container"), className)}
    >
      {children}
    </div>
  );
};

export default Tooltip;
