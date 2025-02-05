import buttonStyles from "./Buttons.module.css";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";
import { useEffect, useState } from "react";
import { SPEED_VALUES, DEFAULT_SPEED_INDEX } from "./contants";
import { useSortContext } from "@features/sortSensei/context";
import { useLineValidation } from "./hooks/useLineValidation";
import { useTableContext } from "@features/sortSensei/table/context";
import { useButtonContext } from "./context";

/**
 * PlaySpeedController component renders a "Play" button that allows the user to
 * check the solution step by step at the selected speed. It also renders a
 * speed range input to allow the user to change the speed of the animation.
 *
 * @returns {JSX.Element} A JSX element containing a "Play" or "Pause" button, a speed range input
 */

const PlaySpeedController = () => {
  const { step, setStep, processList } = useSortContext();
  const [selectedSpeedIndex, setSelectedSpeedIndex] = useState<number>(DEFAULT_SPEED_INDEX);
  const { validateLine } = useLineValidation();
  const { setCellsValidation: setCellsValidation } = useTableContext();
  const { isPlaying, setIsPlaying, timeoutRef, clearPlayBackTimer } = useButtonContext();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  /* Updates the selected speed index state when the user changes the speed.*/
  const handleSpeedChange = (newSpeedIndex: number) => {
    setSelectedSpeedIndex(newSpeedIndex);
  };

  useEffect(() => {
    // If the user is playing, start the interval to check the next step
    if (isPlaying) {
      // stop timer at the last steps
      if (step >= processList.length) {
        clearPlayBackTimer();
        return;
      }
      // create timer
      timeoutRef.current = setInterval(() => {
        // cell validation
        setCellsValidation((prev) => {
          const updated = [...prev];
          updated[step] = validateLine(step);
          return updated;
        });
        // next step
        setStep(step + 1);
      }, SPEED_VALUES[selectedSpeedIndex]); // with selected speed from pre-defined speed
    }

    // Clear the interval when the user stops playing
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
    setCellsValidation,
    setStep,
    step,
    timeoutRef,
    validateLine,
  ]);

  return (
    <>
      <div className={buttonStyles["play-speed-container"]}>
        {!isPlaying || step === processList.length ? (
          // Play button is showed when is not playing or at the last step*
          <FaPlay
            aria-label="Auto Check Line"
            data-tooltip="top"
            onClick={handlePlayPause}
            className={buttonStyles["play-icon"]}
          />
        ) : (
          // Pause button is showed when is playing
          <GiPauseButton
            aria-label="Stop Check Line"
            data-tooltip="top"
            onClick={handlePlayPause}
            className={buttonStyles["pause-icon"]}
          />
        )}
        {/* A range with pre-defined speeds*/}
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
