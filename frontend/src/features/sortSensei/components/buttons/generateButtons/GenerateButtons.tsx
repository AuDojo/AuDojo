import { HOTKEYS } from "@/config/hotkeyMap";
import { useTutorialModalContext } from "@/features/sortSensei/context";
import { useThrottle } from "@/hooks/useThrottleDebounce";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { CustomArrayButton, FormSubmitButtons, RandomArrayButton } from "./components";
import styles from "./GenerateButtons.module.css";

const GenerateButtons = () => {
  const { highlightRefs } = useTutorialModalContext();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * Toggles the state of the custom array form.
   * The form is hidden if not isSubmitting, and shown if isSubmitting.
   */
  const toggleCustomArray = useThrottle(() => {
    setIsSubmitting(!isSubmitting);
  });

  useHotkeys(isSubmitting ? HOTKEYS.Close : HOTKEYS.Custom, toggleCustomArray, {
    preventDefault: true,
    enableOnFormTags: ["input"],
  });

  return (
    <>
      <div ref={highlightRefs.generateButtons} className={styles["generate-buttons-container"]}>
        <CustomArrayButton isSubmitting={isSubmitting} toggleCustomArray={toggleCustomArray} />
        <FormSubmitButtons isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />
        <RandomArrayButton setIsSubmitting={setIsSubmitting} />
      </div>
    </>
  );
};

export default GenerateButtons;
