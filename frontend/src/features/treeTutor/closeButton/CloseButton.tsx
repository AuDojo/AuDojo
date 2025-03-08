import { RiCloseLargeFill } from "react-icons/ri";
import styles from "./CloseButton.module.css";

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button type="button" className={styles.closeButton} onClick={onClick}>
      <RiCloseLargeFill />
    </button>
  );
};

export default CloseButton;
