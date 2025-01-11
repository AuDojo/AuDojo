import { memo } from "react";
import styles from "./CloseButton.module.css";

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = memo(function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button onClick={onClick} className={styles["close-button"]}>
      <svg fill="currentColor" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="m18.442 2.442-.884-.884L10 9.116 2.442 1.558l-.884.884L9.116 10l-7.558 7.558.884.884L10 10.884l7.558 7.558.884-.884L10.884 10l7.558-7.558Z" />
      </svg>
    </button>
  );
});

export default CloseButton;
