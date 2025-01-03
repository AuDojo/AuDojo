import { useTutorialModalContext } from "@features/sortSensei/hooks";
import styles from "./CloseButton.module.css";

const CloseButton = () => {
  const { dialogRef } = useTutorialModalContext();

  const handleOnClick = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <button onClick={handleOnClick} className={styles["close-button"]}>
      &#128473;
    </button>
  );
};

export default CloseButton;
