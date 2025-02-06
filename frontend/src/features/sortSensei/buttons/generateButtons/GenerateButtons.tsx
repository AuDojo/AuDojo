import { useTutorialModalContext } from "@features/sortSensei/context";
import { RandomArrayButton, CustomArrayButton, FormSubmitButtons } from "./components";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { HOTKEYS } from "@/lib/hotkeyMap";
import styles from "./GenerateButtons.module.css";

const GenerateButtons = () => {
  const { highlightRefs } = useTutorialModalContext();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * Toggles the state of the custom array form.
   * The form is hidden if not isSubmitting, and shown if isSubmitting.
   */
  const toggleCustomArray = () => {
    setIsSubmitting(!isSubmitting);
  };

  useHotkeys(isSubmitting ? HOTKEYS.Close : HOTKEYS.Custom, toggleCustomArray, {
    preventDefault: true,
    enableOnFormTags: ["input"],
  });

  return (
    <>
      <div ref={highlightRefs.solveButtons} className={styles["generate-buttons-container"]}>
        <CustomArrayButton isSubmitting={isSubmitting} toggleCustomArray={toggleCustomArray} />
        <FormSubmitButtons isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />
        <RandomArrayButton setIsSubmitting={setIsSubmitting} />
      </div>
    </>
  );
};

export default GenerateButtons;
