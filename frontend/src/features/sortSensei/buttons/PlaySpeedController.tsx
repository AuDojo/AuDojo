import buttonStyles from "./Buttons.module.css";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";
import { useEffect, useState } from "react";
import { SPEED_VALUES, DEFAULT_SPEED_INDEX } from "./contants";
import { useSortContext } from "@features/sortSensei/context";
import { useLineValidation } from "./hooks/useLineValidation";
import { useTableContext } from "@features/sortSensei/table/context";
import { useButtonContext } from "./context";

const PlaySpeedController = () => {
  const { step, setStep, processList } = useSortContext();
  const [selectedSpeedIndex, setSelectedSpeedIndex] = useState<number>(DEFAULT_SPEED_INDEX);
  const { validateLine } = useLineValidation();
  const { setCellValidation } = useTableContext();
  const { isPlaying, setIsPlaying, timeoutRef, clearPlayBackTimer } = useButtonContext();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (newSpeedIndex: number) => {
    setSelectedSpeedIndex(newSpeedIndex);
  };

  useEffect(() => {
    if (isPlaying) {
      if (step >= processList.length) {
        clearPlayBackTimer();
        return;
      }
      timeoutRef.current = setInterval(() => {
        setCellValidation((prev) => {
          const updated = [...prev];
          updated[step] = validateLine(step);
          return updated;
        });
        setStep(step + 1);
      }, SPEED_VALUES[selectedSpeedIndex]);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [
    clearPlayBackTimer,
    isPlaying,
    processList.length,
    selectedSpeedIndex,
    setCellValidation,
    setStep,
    step,
    timeoutRef,
    validateLine,
  ]);

  return (
    <>
      <div className={buttonStyles["play-speed-container"]}>
        {!isPlaying || step === processList.length ? (
          <FaPlay
            aria-label="Auto Check Line"
            data-tooltip="top"
            onClick={handlePlayPause}
            className={buttonStyles["play-icon"]}
          />
        ) : (
          <GiPauseButton
            aria-label="Stop Check Line"
            data-tooltip="top"
            onClick={handlePlayPause}
            className={buttonStyles["pause-icon"]}
          />
        )}

        <div className={buttonStyles["speed-range"]}>
          <input
            type="range"
            min={0}
            max={SPEED_VALUES.length - 1}
            step={1}
            value={selectedSpeedIndex}
            onChange={(e) => handleSpeedChange(parseInt(e.target.value))}
          />
        </div>
      </div>
    </>
  );
};

export default PlaySpeedController;
