import { useTranslation } from "react-i18next";
import { MAX_ARRAY_SIZE, MIN_ARRAY_SIZE } from "@/features/sortSensei/constants";
import buttonStyles from "./GenerateButtons.module.css";
import { useState } from "react";
import { useSortContext } from "@/features/sortSensei/context";
import { generateRandomArray } from "./utils";
import { useButtonContext } from "@/features/sortSensei/buttons/context";
import { useResetTable } from "@features/sortSensei/table/hooks/useResetTable";

const RandomArrayButton = () => {
  const { t } = useTranslation("sortsensei");
  const { sharedArray, setSharedArray } = useSortContext();
  const [arrayLength, setArrayLength] = useState<number>(sharedArray.length);
  const { clearPlayBackTimer } = useButtonContext();
  const { resetTable } = useResetTable();

  const handleRandomArray = () => {
    if (arrayLength < MIN_ARRAY_SIZE || arrayLength > MAX_ARRAY_SIZE) return;
    setSharedArray(arrayLength ? generateRandomArray(arrayLength) : generateRandomArray(sharedArray.length));
    clearPlayBackTimer();
    resetTable();
  };

  const handleArrayLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setArrayLength(value);
  };

  const handleArrayLengthKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (arrayLength < MIN_ARRAY_SIZE || arrayLength > MAX_ARRAY_SIZE) return;
    if (event.key === "Enter") {
      handleRandomArray();
    }
  };

  return (
    <>
      <button
        className={buttonStyles["random-array-button"]}
        aria-label="Random [R]"
        data-tooltip="top"
        onClick={handleRandomArray}
      >
        {t("button.new-random")}
      </button>

      <div className={buttonStyles["length-container"]}>
        <input
          className={buttonStyles["length-select"]}
          type="number"
          value={arrayLength}
          min={MIN_ARRAY_SIZE}
          max={MAX_ARRAY_SIZE}
          onChange={handleArrayLengthChange}
          onKeyDown={handleArrayLengthKeyDown}
        />

        <div className={buttonStyles["length-info"]}>
          {t("length-input-info", { min: MIN_ARRAY_SIZE, max: MAX_ARRAY_SIZE })}
        </div>
      </div>
    </>
  );
};

export default RandomArrayButton;
