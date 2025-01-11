import { useSortContext } from "@/hooks";
import { select } from "d3";
import { useEffect, useMemo, useRef } from "react";
import { margin, maxWidthEachBar, textMarginBottom, timeBarsMove, timeLoadColor } from "./constants";
import useResize from "./hooks/useResize";
import useScales from "./hooks/useScales";
import style from "./SortVisualizer.module.css";
import { createBubbleSortData } from "./utils/createBubbleSortData";

/**
 * A component that renders a visual representation of the Bubble Sort algorithm.
 * It uses D3.js to create an animated bar chart that shows the sorting process.
 *
 * @return {JSX.Element} A SVG component with a bar for each element in the given array.
 * The bars are animated to show the bubble sort process.
 */
const BubbleSortVisualizer = () => {
  const { stepsList, step, sharedArray, bubbleElement } = useSortContext();
  const i = step - 1; // Current step index
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // flexible container size based on the available space
  const containerSize = useResize({
    containerRef: containerRef,
    totalBarsWidth: sharedArray.length * maxWidthEachBar,
  });

  // Create scales for positioning and sizing bars
  const { xScale, yScale } = useScales({ containerSize, sharedArray });

  // Calculate the data for the bar chart based on the current step
  const data = useMemo(() => {
    if (!stepsList.length) return null;
    return createBubbleSortData({
      currentArray: stepsList[i],
      numSteps: stepsList.length,
      i,
      bubbleElement,
    });
  }, [stepsList, i]);

  useEffect(() => {
    if (!stepsList.length || !svgRef.current || !data) return;

    const svg = select(svgRef.current);

    // Assigned the data
    const bars = svg.selectAll("g").data(data).enter().append("g");

    // Set the initial position of the bars
    bars.attr("transform", (d) => `translate(${xScale(d.previousIndex)}, 0)`);

    // Add rectangles representing bars
    bars
      .append("rect")
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => containerSize.height - yScale(d.value) - margin.bottom)
      .attr("width", xScale.bandwidth())
      .attr("class", style["unsorted-bar"]);

    // Add the value labels for each bar
    bars
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - textMarginBottom)
      .attr("class", style["bar-text"])
      .text((d) => d.value);

    // Highlight swapped bars
    bars
      .filter((d) => i >= 1 && d.isSwapped)
      .selectAll("rect")
      .transition()
      .duration(timeLoadColor)
      .attr("class", style["changed-bar"]);

    // Highlight sorted bars
    bars
      .filter((d) => d.isSorted)
      .selectAll("rect")
      .transition()
      .attr("class", style["sorted-bar"]);

    // Animate the bars to their new positions
    bars
      .transition()
      .duration(timeBarsMove)
      .attr("class", style["unsorted-bar"])
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
