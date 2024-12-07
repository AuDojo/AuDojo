import { useSortContext } from "@hooks/index";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

interface BarData {
  value: number;
  index: number;
  previousIndex: number;
  isSorted: boolean;
  isActive: boolean;
  uniqueId: string; // Add this to handle duplicate values
}

const D3SortVisualizer = () => {
  const { stepsList, step, mergeRanges } = useSortContext();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialPositionsRef = useRef<Map<string, number>>(new Map());

  // State to track container dimensions
  const [dimensions, setDimensions] = useState({
    width: 790,
    height: 240,
  });

  // Handle window resize
  useEffect(() => {
    // Function to handle the resizing of the container
    const handleResize = () => {
      // Check if containerRef is assigned to a DOM element
      if (containerRef.current) {
        // Get the current width of the container element
        const containerWidth = containerRef.current.clientWidth;

        // Set the dimensions state with new width and height values
        // Width is the lesser of 790px or the container's width minus 20px for padding
        setDimensions({
          width: Math.min(790, containerWidth - 20), // Ensure width does not exceed 790px
          height: 240, // Set a fixed height of 240px
        });
      }
    };

    // Initial size
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Visualization effect
  useEffect(() => {
    if (!stepsList.length || !svgRef.current) return;

    const margin = { top: 20, right: 20, bottom: 10, left: 10 };
    const maxBarWidth = 50;

    // Calculate responsive bar width
    const availableWidth = dimensions.width - margin.left - margin.right;
    const currentArray = stepsList[step - 1];
    const minBarWidth = 20; // Minimum width for bars

    // Calculate bar width based on available space and number of elements
    const calculatedBarWidth = Math.min(
      maxBarWidth,
      Math.max(minBarWidth, availableWidth / currentArray.length)
    );

    // Calculate total width needed for bars
    const totalBarsWidth = calculatedBarWidth * currentArray.length;

    // Center bars
    const adjustedMarginLeft =
      margin.left + (availableWidth - totalBarsWidth) / 2;

    // Initialize positions map on first render
    if (initialPositionsRef.current.size === 0) {
      stepsList[0].forEach((value, index) => {
        const key = `${value}-${
          stepsList[0].slice(0, index).filter((v) => v === value).length
        }`;
        initialPositionsRef.current.set(key, index);
      });
    }

    const previousArray = step > 1 ? stepsList[step - 2] : currentArray;

    // Create bar data
    const barData: BarData[] = currentArray.map((value, index) => {
      // Create unique key based on value and occurrence count
      const occurrenceCount = currentArray
        .slice(0, index)
        .filter((v) => v === value).length;
      const uniqueId = `${value}-${occurrenceCount}`;

      // Get initial position from ref
      const initialPos = initialPositionsRef.current.get(uniqueId) ?? index;

      // Find position in previous array using the same uniqueId logic
      const previousIndex = previousArray.findIndex((v, i) => {
        const prevOccurrences = previousArray
          .slice(0, i)
          .filter((v2) => v2 === value).length;
        return v === value && prevOccurrences === occurrenceCount;
      });

      const currentMergeRange = mergeRanges[step - 1];
      const isSorted =
        currentMergeRange &&
        index >= currentMergeRange[0] &&
        index <= currentMergeRange[1];

      return {
        value,
        index,
        previousIndex: previousIndex === -1 ? initialPos : previousIndex,
        isSorted,
        isActive: previousIndex !== index && previousIndex !== -1,
        uniqueId,
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
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(currentArray) || 0])
      .range([dimensions.height - margin.bottom, margin.top]);

    // Create and update bars
    const bars = svg.selectAll("g").data(barData).enter().append("g");

    // Initial position based on previous index
    bars.attr(
      "transform",
      (d) => `translate(${xScale(String(d.previousIndex))}, 0)`
    );

    // Add rectangles
    bars
      .append("rect")
      .attr("y", (d) => yScale(d.value))
      .attr(
        "height",
        (d) => dimensions.height - margin.bottom - yScale(d.value)
      )
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
    bars
      .filter((d) => d.isActive) // Select only active bars
      .transition()
      .duration(600) // Highlight duration
      .select("rect")
      .attr("fill", "#ff6b6b") // Highlight color
      .transition()
      .duration(700) // Movement duration
      .attr("fill", (d) => (d.isSorted ? "#51cf66" : "#74c0fc")); // Final color

    // Move all bars to their new positions
    bars
      .transition()
      .duration(700) // Same duration as the color transition
      .attr("transform", (d) => `translate(${xScale(String(d.index))}, 0)`);

    bars
      .filter((d) => !d.isActive)
      .select("rect")
      .transition()
      .duration(700)
      .attr("fill", (d) => (d.isSorted ? "#51cf66" : "#74c0fc"));
  }, [stepsList, step, mergeRanges, dimensions]); // Add dimensions to dependencies

  return (
    <div
      ref={containerRef}
      style={{ display: "flex", justifyContent: "center" }}
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

export default D3SortVisualizer;
