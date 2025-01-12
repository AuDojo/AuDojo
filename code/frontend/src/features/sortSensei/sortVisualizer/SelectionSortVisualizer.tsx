import { useSortContext } from "@hooks/index";
import { select } from "d3";
import { useEffect, useRef, useMemo } from "react";
import useResize from "./hooks/useResize";
import style from "./SortVisualizer.module.css";
import { margin, maxWidthEachBar, textMarginBottom, timeLoadColor, timeBarsMove, textMarginTop } from "./constants";
import useScales from "./hooks/useScales";
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

    // Animate the bars to their new positions
    bars
      .transition()
      .delay(timeBarsMove)
      .duration(timeBarsMove)
      .attr("class", style["unsorted-bar"])
      .attr("transform", (d) => `translate(${xScale(d.index)}, 0)`);

    // add selected element label
    bars
      .filter((d) => d.isSelected)
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - textMarginTop)
      .attr("class", style["bar-marker"])
      .text("(min)")
      .transition()
      .delay(timeBarsMove) // remove text before bars move
      .remove();

    // Highlight the selected bar
    bars
      .filter((d) => d.isSelected)
      .selectAll("rect")
      .transition()
      .duration(timeLoadColor) // changing color effect
      .attr("class", style["changed-bar"]);

    // add leftmost unsorted element label
    bars
      .filter((d) => d.isLeftUnsorted)
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => (d.isSelected ? yScale(d.value) - textMarginTop - margin.top : yScale(d.value) - textMarginTop))
      .attr("class", style["bar-marker"])
      .text("(left)")
      .transition()
      .delay(timeBarsMove) // remove text before bars move
      .remove();

    // Highlight the leftmost unsorted bar
    bars
      .filter((d) => d.isLeftUnsorted)
      .select("rect")
      .transition()
      .duration(timeLoadColor)
      .attr("class", style["changed-bar"])
      .transition()
      .delay((timeBarsMove * 3) / 2) // after bars move, change back to default color
      .attr("class", (d) => (d.isSorted ? style["sorted-bar"] : style["unsorted-bar"]));

    // Highlight the current sorted bar after delay
    bars
      .filter((d) => d.isCurrentSorted)
      .selectAll("rect")
      .transition()
      .delay(timeBarsMove)
      .attr("class", style["sorted-bar"]);

    // Highlight the sorted bar except the current sorted bar
    bars
      .filter((d) => d.isSorted && !d.isCurrentSorted)
      .selectAll("rect")
      .attr("class", style["sorted-bar"]);

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
