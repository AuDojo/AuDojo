import { useSortContext } from "@/features/sortSensei/context/SortContext";
import { select } from "d3";
import { useEffect, useMemo, useRef } from "react";
import { margin, maxWidthEachBar, textMarginBottom, textMarginTop, timeBarsMove, timeLoadColor } from "./constants";
import useResize from "./hooks/useResize";
import useScales from "./hooks/useScales";
import style from "./SortVisualizer.module.css";
import { createQuickSortData } from "./utils/createQuickSortData";

/**
 * A component that renders a visual representation of the Quick Sort algorithm.
 * It uses D3.js to create an animated bar chart that shows the sorting process.
 *
 * @returns {JSX.Element} A SVG component with a bar for each element in the given array.
 * The bars are animated to show the quick sort process.
 */
const QuickSortVisualizer = () => {
  const { processList, step, sharedArray, pivotElements } = useSortContext();
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
    if (!processList.length) return null;
    return createQuickSortData({
      currentArray: processList[i],
      previousArray: i >= 1 ? processList[i - 1] : processList[i],
      numSteps: processList.length,
      i,
      pivotElements,
    });
  }, [processList, i]);

  useEffect(() => {
    if (!processList.length || !svgRef.current || !data) return;

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

    // Add marker text for used pivot bars
    bars
      .filter((d) => d.isPivot)
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - textMarginTop)
      .attr("dy", "0.1em")
      .attr("class", style["bar-marker"])
      .text("pivot");

    // change color of pivot bars
    bars
      .filter((d) => d.isPivot)
      .selectAll("rect")
      .transition() // color change effect
      .duration(timeLoadColor)
      .attr("class", style["changed-bar"]);

    // Animate bars to new positions
    bars
      .transition()
      .delay(timeBarsMove / 2)
      .duration(timeBarsMove)
      .attr("class", style["unsorted-bar"])
      .attr("transform", (d) => `translate(${xScale(d.index)}, 0)`);

    // change bar-marker to last pivot (add "last")
    bars
      .filter((d) => d.isPivot)
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - textMarginTop)
      .attr("dy", "-0.8em")
      .transition()
      .delay(timeBarsMove) // delay is not inherited
      .attr("class", style["bar-marker"])
      .text("last");

    // Highlight sorted bars
    bars
      .filter((d) => d.isSorted)
      .selectAll("rect")
      .transition()
      .delay(timeBarsMove) // delay is not inherited => define again
      .attr("class", style["sorted-bar"]);

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
