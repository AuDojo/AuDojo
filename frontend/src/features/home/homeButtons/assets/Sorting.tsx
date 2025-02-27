import { useEffect, useRef, useState } from "react";
import { select } from "d3";
import style from "../HomeButtons.module.css";
import useScales from "@/features/sortSensei/components/sortVisualizer/hooks/useScales";
import { createBubbleSortData } from "@/features/sortSensei/components/sortVisualizer/utils/createBubbleSortData";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

// demo data to show bubble sort animation on homebutton
const array: number[] = [4, 3, 1, 2, 6, 5];
const process = [
  [4, 3, 1, 2, 6, 5],
  [3, 4, 1, 2, 6, 5],
  [3, 1, 4, 2, 6, 5],
  [3, 1, 2, 4, 6, 5],
  [3, 1, 2, 4, 5, 6],
  [1, 3, 2, 4, 5, 6],
  [1, 2, 3, 4, 5, 6],
];
const bubbleElements = [0, 1, 2, 4, 0, 1];
const durationSwapElements = 600;

/** Component that describes SortSensei home-button */
const Sorting = () => {
  const isHovering = useRef<boolean>(false); // animate sorting if hovering
  const svgRef = useRef<SVGSVGElement>(null); // track size and place bars
  const timerRef = useRef<NodeJS.Timeout | null>(null); // start loop on hover, stop on unhover

  const [step, setStep] = useState<number>(0); // track current step

  const dimensions = useResizeObserver(svgRef); // get svg container size

  const containerSize = { width: dimensions?.width ?? 250, height: dimensions?.height ?? 200 }; // default to 250x200

  /** specific data of bubblesort: {currentArray, numSteps, i, bubbleElements} */
  const data = createBubbleSortData({
    currentArray: process[step],
    numSteps: process.length,
    i: step,
    bubbleElements,
  });

  const { xScale, yScale } = useScales({
    containerSize,
    sharedArray: array,
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = select(svgRef.current);

    // bind data to bars
    const bars = svg.selectAll("g").data(data).enter().append("g");

    // init bars position
    bars.attr("transform", (d) => `translate(${xScale(d.previousIndex)}, 0)`);

    // draw bars
    bars
      .append("rect")
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => containerSize.height - yScale(d.value) - 15)
      .attr("width", xScale.bandwidth())
      .attr("class", style["unsorted-bar"]);

    // animate bars (on hover)
    if (isHovering.current) {
      bars
        .transition()
        .duration(durationSwapElements)
        .attr("class", style["unsorted-bar"])
        .attr("transform", (d) => `translate(${xScale(d.index)}, 0)`);
    }

    // clean up on unmount or when the bars change or resize
    return () => {
      svg.selectAll("*").remove();
    };
  }, [containerSize.height, data, xScale, yScale]);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleHovering = () => {
    isHovering.current = true;
    clearTimer();
    timerRef.current = setInterval(() => {
      setStep((prev) => (prev + 1) % process.length);
    }, durationSwapElements);
  };
  const handleStopHovering = () => {
    isHovering.current = false;
    setStep(0);
    clearTimer();
  };

  return (
    <svg
      ref={svgRef}
      className={cx("home-button-img", "sortsensei-img")}
      onMouseEnter={handleHovering}
      onMouseLeave={handleStopHovering}
    ></svg>
  );
};

export default Sorting;
