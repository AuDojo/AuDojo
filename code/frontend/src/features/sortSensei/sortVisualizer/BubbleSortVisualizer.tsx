import { useSortContext } from "@hooks/index";
import * as d3 from "d3";
import { useEffect, useMemo, useRef } from "react";
import useResize from "./useResize";
import style from "./SortVisualizer.module.css";

interface BarData {
  value: number;
  index: number;
  previousIndex: number;
  isSorted: boolean;
  isSwapped: boolean;
}
interface BubbleSortProps {
  array: number[];
  stepsListLength: number;
  i: number;
  bubbleElement: number[];
}
const maxBarWidth = 50;
const margin = {
  top: 20,
  right: 20,
  bottom: 10,
  left: 37,
};
const adjustedMarginLeft = margin.left - 12;

/**
 * Transforms the given array into an array of BarData objects.
 *
 * @returns {BarData[]} An array of BarData objects with updated indices and sorted status.
 */
const getData = ({ array, stepsListLength, i, bubbleElement }: BubbleSortProps): BarData[] => {
  return array.map((value, index) => {
    // Determine indices of elements that were swapped in the previous step
    const firstElementSwap = i >= 1 ? bubbleElement[i - 1] : -2;
    const secondElementSwap = firstElementSwap + 1;

    // Calculate the previous index after swapping
    const previousIndex =
      index === firstElementSwap || index === secondElementSwap
        ? index === firstElementSwap
          ? secondElementSwap
          : firstElementSwap
        : index;

    // Determine if the current element is sorted
    let isSorted = false;
    isSorted = i === stepsListLength - 1;

    return {
      value,
      index,
      previousIndex,
      isSorted,
      isSwapped: index === bubbleElement[i - 1] || index - 1 === bubbleElement[i - 1],
    };
  });
};
/**
 * A visualizer component for the Bubble Sort algorithm. It updates dynamically based on
 * the current step of the sorting process, highlighting swapped elements and marking
 * sorted elements as the algorithm progresses.
 *
 * @returns {JSX.Element} A container with an SVG element displaying the bar
 * chart visualization of the sorting process.
 */

const BubbleSortVisualizer = () => {
  const { stepsList, step, sharedArray, bubbleElement } = useSortContext();
  const i = step - 1;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const containerSize = useResize({
    containerRef: containerRef,
    totalBarsWidth: sharedArray.length * maxBarWidth,
  });

  const xScale = useMemo(
    () =>
      d3
        .scaleBand<number>()
        .domain(d3.range(sharedArray.length))
        .range([margin.left, containerSize.width - adjustedMarginLeft])
        .padding(0.16),
    [containerSize.width, sharedArray.length]
  );

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, d3.max(sharedArray) ?? containerSize.height])
      .range([containerSize.height - margin.bottom, margin.top]);
  }, [containerSize.height, sharedArray]);

  // Calculate the data for the bar chart based on the current step
  const data = useMemo(() => {
    if (!stepsList.length) return null;
    return getData({
      array: stepsList[i],
      stepsListLength: stepsList.length,
      i,
      bubbleElement,
    });
  }, [stepsList, i, bubbleElement]);

  useEffect(() => {
    if (!stepsList.length || !svgRef.current || !data) return;

    // Select the SVG and clear it
    const svg = d3.select(svgRef.current);

    // Create the bars and add the bars to the SVG
    const bars = svg.selectAll("g").data(data).enter().append("g");

    // Set the transformation of each bar to be the previous index
    bars.attr("transform", (d) => `translate(${xScale(d.previousIndex)}, 0)`);

    // Add the bars
    bars
      .append("rect")
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => containerSize.height - yScale(d.value) - margin.bottom)
      .attr("width", xScale.bandwidth())
      .attr("class", style["bar-base"]);

    // Add the text labels for each bar
    bars
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - margin.bottom / 2)
      .attr("class", style["bar-text"])
      .text((d) => d.value);

    // Highlight swapped bars
    bars
      .filter((d) => i >= 1 && d.isSwapped)
      .selectAll("rect")
      .attr("class", style["swapped-bar"]);

    // Add a class for sorted bars
    bars
      .filter((d) => d.isSorted)
      .selectAll("rect")
      .attr("class", style["sorted-bar"]);

    // Animate the bars to their new positions
    bars
      .transition()
      .duration(700)
      .attr("transform", (d) => `translate(${xScale(d.index)}, 0)`);

    return () => {
      // Remove the bars when the component is unmounted
      svg.selectAll("*").remove();
    };
  }, [containerSize, data]);

  return (
    <div className={style["viz-container"]} ref={containerRef}>
      <svg ref={svgRef} width={containerSize.width} height={containerSize.height} />
    </div>
  );
};

export default BubbleSortVisualizer;
