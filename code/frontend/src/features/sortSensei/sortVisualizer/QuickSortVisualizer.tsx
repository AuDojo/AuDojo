import { useSortContext } from "@hooks/index";
import { select } from "d3";
import { useEffect, useRef, useMemo } from "react";
import useResize from "./hooks/useResize";
import style from "./SortVisualizer.module.css";
import { margin, maxWidthEachBar, textMarginBottom, timeLoadColor, timeBarsMove, textMarginTop } from "./constants";
import useScales from "./hooks/useScales";
import { createQuickSortData } from "./utils/createQuickSortData";

/**
 * A component that renders a visual representation of the Quick Sort algorithm.
 * It uses D3.js to create an animated bar chart that shows the sorting process.
 *
 * @returns {JSX.Element} A SVG component with a bar for each element in the given array.
 * The bars are animated to show the quick sort process.
 */
const QuickSortVisualizer = () => {
  const { stepsList, step, sharedArray, pivotElement } = useSortContext();
  const i = step - 1;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // flexible container size based on the available space and number of bars
  const containerSize = useResize({
    containerRef: containerRef,
    totalBarsWidth: sharedArray.length * maxWidthEachBar,
  });

  // Create scales for positioning and sizing bars
  const { xScale, yScale } = useScales({ containerSize, sharedArray });

  // Calculate the data for the bar chart based on the current step
  const data = useMemo(() => {
    if (!stepsList.length) return null;
    return createQuickSortData({
      currentArray: stepsList[i],
      previousArray: i >= 1 ? stepsList[i - 1] : stepsList[i],
      numSteps: stepsList.length,
      i,
      pivotElement,
    });
  }, [stepsList, i]);

  useEffect(() => {
    if (!stepsList.length || !svgRef.current || !data) return;

    const svg = select(svgRef.current);

    // Assigned the data
    const bars = svg.selectAll("g").data(data).enter().append("g");

    // Set the initial position of each bar
    bars.attr("transform", (d) => `translate(${xScale(d.previousIndex)}, 0)`);

    // Add rectangles representing bars
    bars
      .append("rect")
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => containerSize.height - yScale(d.value) - margin.bottom)
      .attr("width", xScale.bandwidth())
      .attr("class", style["unsorted-bar"]);

    // Add value labels for each bar
    bars
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - textMarginBottom)
      .text((d) => d.value);

    // Add marker text for pivot bars
    bars
      .filter((d) => d.isPivot)
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - textMarginTop)
      .transition()
      .attr("class", style["bar-marker"])
      .text("(pivot)");

    // Animate color change for pivot bars
    bars
      .filter((d) => d.isPivot)
      .selectAll("rect")
      .transition()
      .duration(timeLoadColor)
      .attr("class", style["changed-bar-blink"]);

    // Highlight sorted bars
    bars
      .filter((d) => d.isSorted)
      .selectAll("rect")
      .transition()
      .attr("class", style["sorted-bar"]);

    // Animate bars to new positions
    bars
      .transition()
      .duration(timeBarsMove)
      .attr("class", style["unsorted-bar"])
      .attr("transform", (d) => `translate(${xScale(d.index)}, 0)`);

    return () => {
      // Clear the SVG content when component is unmounted
      svg.selectAll("*").remove();
    };
  }, [containerSize, data]);

  return (
    <div className={style["viz-container"]} ref={containerRef}>
      <svg ref={svgRef} width={containerSize.width} height={containerSize.height} />
    </div>
  );
};

export default QuickSortVisualizer;
