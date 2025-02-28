import { useEffect, useRef, useState } from "react";
import { select } from "d3";
import style from "../HomeButtons.module.css";
import useScales from "@/features/sortSensei/components/sortVisualizer/hooks/useScales";
import { createBubbleSortData } from "@/features/sortSensei/components/sortVisualizer/utils/createBubbleSortData";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import classNames from "classnames/bind";
import { demoArray, demoProcess, demoBubbleElements, durationSorting } from "./constants";

const cx = classNames.bind(style);

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
    currentArray: demoProcess[step],
    numSteps: demoProcess.length,
    i: step,
    bubbleElements: demoBubbleElements,
  });

  const { xScale, yScale } = useScales({
    containerSize,
    sharedArray: demoArray,
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
        .duration(durationSorting)
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
      setStep((prev) => (prev + 1) % demoProcess.length);
    }, durationSorting);
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
