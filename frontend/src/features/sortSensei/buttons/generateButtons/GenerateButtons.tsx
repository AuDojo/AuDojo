import { useTutorialModalContext } from "@features/sortSensei/context";
import { RandomArrayButton, CustomArrayButton } from "./components";

import styles from "./GenerateButtons.module.css";
const GenerateButtons = () => {
  const { highlightRefs } = useTutorialModalContext();

  return (
    <>
      <div ref={highlightRefs.solveButtons} className={styles["generate-buttons-container"]}>
        <CustomArrayButton />
        <RandomArrayButton />
      </div>
    </>
  );
};

export default GenerateButtons;
