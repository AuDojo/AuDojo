import { useSortContext } from "@/hooks";
import { select } from "d3";
import { useEffect, useMemo, useRef } from "react";
import { margin, maxWidthEachBar, textMarginBottom, textMarginTop, timeBarsMove, timeLoadColor } from "./constants";
import useResize from "./hooks/useResize";
import useScales from "./hooks/useScales";
import style from "./SortVisualizer.module.css";
import { createSelectionSortData } from "./utils/createSelectionSortData";

/**
 * A component that renders a visual representation of the Selection Sort algorithm.
 * It uses D3.js to create an animated bar chart that shows the sorting process.
 *
 * @returns {JSX.Element} A SVG component with a bar for each element in the given array.
 * The bars are animated to show the selection sort process.
 */
const SelectionSortVisualizer = () => {
  const { stepsList, step, sharedArray, selectionElement } = useSortContext();
  const i = step - 1;
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
    return createSelectionSortData({
      currentArray: stepsList[i],
      numSteps: stepsList.length,
      i,
      selectionElement,
    });
  }, [stepsList, i]);

  useEffect(() => {
    if (!stepsList.length || !svgRef.current || !data) return;

    const svg = select(svgRef.current);

    // Assigned the data
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

    // Add the value labels for each bar
    bars
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - textMarginBottom)
      .text((d) => d.value);

    // add selected element label
    bars
      .filter((d) => d.isSelected)
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - textMarginTop)
      .transition()
      .attr("class", style["bar-marker"])
      .text("(min)");

    // add leftmost unsorted element label
    bars
      .filter((d) => d.isLeftUnsorted && !d.isSelected)
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - textMarginTop)
      .transition()
      .attr("class", style["bar-marker"])
      .text("(left)");

    // new y-position for label when the bar is both leftmost and selected
    bars
      .filter((d) => d.isLeftUnsorted && d.isSelected)
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - textMarginTop - margin.top)
      .transition()
      .attr("class", style["bar-marker"])
      .text("(left)");

    // Highlight the selected bar with blinking color
    bars
      .filter((d) => d.isSelected)
      .selectAll("rect")
      .transition()
      .duration(timeLoadColor) // changing color
      .attr("class", style["changed-bar-blink"]);

    // Highlight the leftmost unsorted bar
    bars
      .filter((d) => d.isLeftUnsorted)
      .selectAll("rect")
      .transition()
      .duration(timeLoadColor)
      .attr("class", style["changed-bar"]);

    // Highlight the sorted bar
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

export default SelectionSortVisualizer;
