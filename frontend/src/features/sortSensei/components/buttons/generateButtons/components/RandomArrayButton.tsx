import { HOTKEYS } from "@/config/hotkeyMap";
import { useButtonContext } from "@/features/sortSensei/components/buttons/context";
import { useResetTable } from "@/features/sortSensei/components/table/hooks/useResetTable";
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from "@/features/sortSensei/constants";
import { useSortContext, useTutorialModalContext } from "@/features/sortSensei/context";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Trans, useTranslation } from "react-i18next";
import { useDebounceCallback } from "usehooks-ts";
import buttonStyles from "../GenerateButtons.module.css";
import { generateRandomArray } from "../utils";

interface RandomArrayButtonProps {
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

const RandomArrayButton = ({ setIsSubmitting }: RandomArrayButtonProps) => {
  const { isTutorialOpen } = useTutorialModalContext();
  const { t } = useTranslation("sortsensei");
  const { sharedArray, setSharedArray } = useSortContext();
  const [arrayLength, setArrayLength] = useState<number>(sharedArray.length);
  const { clearPlayBackTimer } = useButtonContext();
  const { resetTable } = useResetTable();

  /**
   * Generates a new random array of the desired length
   * and sets it as the shared array.
   * Also resets the table and clears the playback timer.
   */
  const handleRandomArray = useDebounceCallback((): void => {
    // do nothing when array length is out of range
    if (arrayLength < MIN_ARRAY_SIZE || arrayLength > MAX_ARRAY_SIZE) return;

    // Generate a new random array of the desired length
    const newSharedArray = arrayLength ? generateRandomArray(arrayLength) : generateRandomArray(sharedArray.length);

    // Set the new array as the shared array
    setSharedArray(newSharedArray);

    // close the form
    setIsSubmitting(false);

    // Clear the playback timer
    clearPlayBackTimer();

    // Reset the table
    resetTable(newSharedArray);
  }, 100);

  /**
   * Tracking the input for array length
   */
  const handleArrayLengthChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // parse the input to a number
    const value = parseInt(event.target.value, 10);
    // update array length
    setArrayLength(value);
  };

  // Hotkeys
  useHotkeys(HOTKEYS.RandomButton, handleRandomArray, { preventDefault: true, enabled: !isTutorialOpen });

  // only allow enter key when the input is focused
  const ref = useHotkeys<HTMLInputElement>(HOTKEYS.RandomInput, handleRandomArray, {
    preventDefault: true,
    enableOnFormTags: ["input"],
    enabled: !isTutorialOpen,
  });

  return (
    <>
      <button
        className={buttonStyles["random-array-button"]}
        type="button"
        aria-label={`Random [${HOTKEYS.RandomButton}]`}
        data-tooltip="top"
        onClick={handleRandomArray}
      >
        {t("button.new-random")}
      </button>

      <div className={buttonStyles["length-container"]}>
        <input
          id="random-array-length"
          ref={ref}
          className={buttonStyles["length-select"]}
          type="number"
          value={arrayLength}
          min={MIN_ARRAY_SIZE}
          max={MAX_ARRAY_SIZE}
          onChange={handleArrayLengthChange}
        />
        <label className={buttonStyles["length-info"]} htmlFor="random-array-length">
          <Trans i18nKey="length-input-info" t={t} values={{ min: MIN_ARRAY_SIZE, max: MAX_ARRAY_SIZE }} />
        </label>
      </div>
    </>
  );
};

export default RandomArrayButton;
