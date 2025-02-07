import { SortTypes } from "@/features/sortSensei/constants";
import { useSortContext } from "@/features/sortSensei/context/SortContext";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { SortType } from "../../types";
import useResize from "./hooks/useResize";
interface BarData {
  value: number;
  index: number;
  previousIndex: number;
  isSorted: boolean;
  isMerging: boolean;
  type: SortType;
  isPivot: boolean;
  isSelected: boolean;
  isLink: boolean;
}

const SortVisualizer = () => {
  const { processList, step, mergeRanges, sharedArray, sortTypeRef, pivotElements, selectionElements } =
    useSortContext();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialPositionsRef = useRef<Map<string, number>>(new Map());

  // State to track container dimensions

  // Function to handle the resizing of the container
  const margin = {
    top: 20,
    right: 20,
    bottom: 10,
    left: 20,
  };
  const maxBarWidth = 50;
  const dimensions = useResize({ containerRef: containerRef, totalBarsWidth: sharedArray.length * maxBarWidth });
  // Visualization effect
  useEffect(() => {
    if (!processList.length || !svgRef.current) return;

    // Calculate responsive bar width
    const availableWidth = dimensions.width - margin.left - margin.right;
    const currentArray = processList[step - 1];

    // Calculate bar width based on available space and number of elements
    const calculatedBarWidth = Math.min(maxBarWidth, availableWidth / currentArray.length);

    // Calculate total width needed for bars
    const totalBarsWidth = calculatedBarWidth * currentArray.length;

    // Center bars
    const adjustedMarginLeft = margin.left + (availableWidth - totalBarsWidth) / 2;

    // Initialize positions map on first render
    if (initialPositionsRef.current.size === 0) {
      processList[0].forEach((value, index) => {
        const key = `${value}-${index}`;
        initialPositionsRef.current.set(key, index);
      });
    }

    const previousArray = step > 1 ? processList[step - 2] : currentArray;

    const barData: BarData[] = currentArray.map((value, index) => {
      // Create unique key based on value and occurrence count
      const occurrenceCount = currentArray.slice(0, index).filter((v) => v === value).length;

      // Find position in previous array using the same uniqueId logic
      const previousIndex = previousArray.findIndex((v, i) => {
        const prevOccurrences = previousArray.slice(0, i).filter((v2) => v2 === value).length;
        return v === value && prevOccurrences === occurrenceCount;
      });

      const mergeRange = mergeRanges[step - 1];
      const pivotIndex = sortTypeRef.current === SortTypes.QuickSort ? pivotElements[step - 1][0] : null;
      const selectedIndex =
        sortTypeRef.current === SortTypes.SelectionSort && step > 1 ? selectionElements[step - 2] : null;
      const linkElement = sortTypeRef.current === SortTypes.SelectionSort ? currentArray[step - 1] : 0;

      // Merge sort : mark sorted (green) when the subarrays merge
      // Selectionsort : mark sorted (green) when the smallest element moved to left side
      let isSorted = false;
      if (sortTypeRef.current === SortTypes.MergeSort) {
        isSorted = mergeRange && index >= mergeRange[0] && index <= mergeRange[1];
      } else if (sortTypeRef.current === SortTypes.SelectionSort) {
        isSorted = index < currentArray.indexOf(linkElement) || step === processList.length;
      } else {
        // bubble sort and quicksort
        isSorted = step === processList.length;
      }

      return {
        value,
        index,
        previousIndex: previousIndex === -1 ? index : previousIndex,
        isSorted,
        isMerging: mergeRange && index >= mergeRange[0] && index <= mergeRange[1],
        type: sortTypeRef.current,
        isPivot: pivotElements && pivotIndex === previousIndex,
        isSelected: sortTypeRef.current === SortTypes.SelectionSort && selectedIndex === previousIndex,
        isLink: sortTypeRef.current === SortTypes.SelectionSort && previousIndex === step - 2,
      };
    });

    const svg = d3.select(svgRef.current);

    // Clear previous content
    svg.selectAll("*").remove();

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(d3.range(currentArray.length).map(String))
      .range([adjustedMarginLeft, adjustedMarginLeft + totalBarsWidth])
      .padding(0.15);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(currentArray) ?? 0])
      .range([dimensions.height - margin.bottom, margin.top]);

    // Create and update bars
    const bars = svg.selectAll("g").data(barData).enter().append("g");

    // Initial position based on previous index
    bars.attr("transform", (d) => `translate(${xScale(String(d.previousIndex))}, 0)`);

    // Add rectangles
    bars
      .append("rect")
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => dimensions.height - margin.bottom - yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("fill", "#74c0fc") // Start with default color
      .attr("opacity", 1);

    // Add value labels
    bars
      .append("text")
      .attr("x", xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.value) - 5)
      .attr("text-anchor", "middle")
      .style("font-size", `${Math.min(14, calculatedBarWidth / 2)}px`) // Responsive font size
      .text((d) => d.value);

    // Animation sequence
    // mark pivot before moving
    bars
      .filter((d) => d.isPivot || d.isSelected || d.isLink)
      .select("rect")
      .attr("fill", "yellow"); // Highlight pivot element oder max element

    bars
      .filter((d) => d.isMerging || d.isPivot || d.isSelected || d.isLink)
      .transition()
      .duration(600) // Highlight duration
      .select("rect")
      .attr("fill", (d) => (d.isPivot || d.isSelected || d.isLink ? "yellow" : "#ff6b6b")) // Highlight color
      .transition()
      .duration(700)
      .attr("fill", (d) => (d.isSorted || d.isPivot || d.isSelected || d.isLink ? "#51cf66" : "#74c0fc")); // Final color (green or blue)

    // Move all bars to their new positions
    bars
      .transition()
      .duration(700) // Same duration as the color transition
      .attr("transform", (d) => `translate(${xScale(String(d.index))}, 0)`);

    bars
      .filter((d) => !d.isMerging)
      .select("rect")
      .transition()
      .duration(700)
      .attr("fill", (d) => (d.isSorted || d.isPivot || d.isSelected ? "#51cf66" : "#74c0fc"));
  }, [
    processList,
    step,
    mergeRanges,
    dimensions,
    pivotElements,
    sortTypeRef,
    selectionElements,
    margin.left,
    margin.right,
    margin.bottom,
    margin.top,
  ]); // Add dimensions to dependencies

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          display: "block",
          border: "3px solid rgb(0, 63, 87)",
          borderRadius: "15px",
        }}
      />
    </div>
  );
};

export default SortVisualizer;
