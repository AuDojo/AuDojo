import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import styles from "./ArrowButton.module.css";

interface ArrowButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}

const ArrowButton = ({ direction, onClick, disabled }: ArrowButtonProps) => {
  const tooltipContent = direction === "left" ? `Last Template [←]` : `Next Template [→]`;

  return (
    <div className={styles["arrow-button-container"]}>
      <button type="button" disabled={disabled} onClick={onClick} aria-label={tooltipContent} data-tooltip="top 1000">
        {direction === "left" ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
    </div>
  );
};

export default ArrowButton;
