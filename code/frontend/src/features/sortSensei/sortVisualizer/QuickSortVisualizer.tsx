import { useSortContext } from "@hooks/index";
import { select } from "d3";
import { useEffect, useRef, useMemo } from "react";
import useResize from "./hooks/useResize";
import style from "./SortVisualizer.module.css";
import { margin, maxWidthEachBar, textMarginBottom, timeLoadColor, timeBarsMove, textMarginTop } from "./constants";
import useScales from "./hooks/useScales";
import { createQuickSortData } from "./utils/createQuickSortData";

/**
 * Transforms the given array into an array of BarData objects.
 *
 * @returns {QuickSortBarData[]} An array of BarData objects with updated indices and sorted status.
 */

const QuickSortVisualizer = () => {
  const { stepsList, step, sharedArray, pivotElement } = useSortContext();
  const i = step - 1;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerSize = useResize({
    containerRef: containerRef,
    totalBarsWidth: sharedArray.length * maxWidthEachBar,
  });

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

    // Select the SVG and clear it
    const svg = select(svgRef.current);

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
      .attr("class", style["unsorted-bar"]);

    // Add the text labels for each bar
    bars
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - textMarginBottom)
      .text((d) => d.value);
    bars
      .filter((d) => d.isPivot)
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - textMarginTop)
      .transition()
      .attr("class", style["bar-marker"])
      .text("(pivot)");
    // Highlight swapped bars
    bars
      .filter((d) => d.isPivot)
      .selectAll("rect")
      .transition()
      .duration(timeLoadColor) // changing color
      .attr("class", style["changed-bar-blink"]);

    // Add a class for sorted bars
    bars
      .filter((d) => d.isSorted)
      .selectAll("rect")
      .transition() // wait for last transition to finish
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

export default QuickSortVisualizer;
