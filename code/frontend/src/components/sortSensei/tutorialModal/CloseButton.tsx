import { useTutorialModal } from "@hooks/useTutorialModalContext";
import styles from "@styles/sortSensei/TutorialModal.module.css";

const CloseButton = () => {
  const { dialogRef } = useTutorialModal();

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
