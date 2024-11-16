import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useSortContext } from '../../hooks/sortContextHooks';

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
  const initialPositionsRef = useRef<Map<string, number>>(new Map()); 

  const width = 790;
  const height = 240;
  const margin = { top: 20, right: 20, bottom: 10, left: 10 };
  const maxBarWidth = 50; 

  useEffect(() => {
    if (!stepsList.length || !svgRef.current) return;

    if (initialPositionsRef.current.size === 0 && stepsList.length > 0) {
      stepsList[0].forEach((value, index) => {
        const key = `${value}-${stepsList[0].slice(0, index).filter(v => v === value).length}`;
        initialPositionsRef.current.set(key, index);
      });
    }


    const currentArray = stepsList[step - 1];
    const previousArray = step > 1 ? stepsList[step - 2] : currentArray;
    
    // Calculate actual bar width based on container width and number of bars
    const calculatedBarWidth = Math.min(
      maxBarWidth,
      (width - margin.left - margin.right) / currentArray.length
    );
    
    // Calculate total width needed for bars
    const totalBarsWidth = calculatedBarWidth * currentArray.length;
    
    // Calculate left margin to center the bars
    const adjustedMarginLeft = margin.left + (width - totalBarsWidth) / 2;

    // Create bar data with additional properties
    const barData: BarData[] = currentArray.map((value, index) => {
      // Create unique key based on value and occurrence count
      const occurrenceCount = currentArray.slice(0, index).filter(v => v === value).length;
      const uniqueId = `${value}-${occurrenceCount}`;
      
      // Get initial position from ref
      const initialPos = initialPositionsRef.current.get(uniqueId) ?? index;
      
      // Find position in previous array using the same uniqueId logic
      const previousIndex = previousArray.findIndex((v, i) => {
        const prevOccurrences = previousArray.slice(0, i).filter(v2 => v2 === value).length;
        return v === value && prevOccurrences === occurrenceCount;
      });

      const currentMergeRange = mergeRanges[step - 1];
      const isSorted = currentMergeRange && 
        index >= currentMergeRange[0] && 
        index <= currentMergeRange[1];

      return {
        value,
        index,
        previousIndex: previousIndex === -1 ? initialPos : previousIndex,
        isSorted,
        isActive: previousIndex !== index && previousIndex !== -1,
        uniqueId
      };
    });


    const svg = d3.select(svgRef.current);
    
    // Clear previous content
    svg.selectAll('*').remove();

    // Create scales
    const xScale = d3.scaleBand()
      .domain(d3.range(currentArray.length).map(String))
      .range([adjustedMarginLeft, adjustedMarginLeft + totalBarsWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(currentArray) || 0])
      .range([height - margin.bottom, margin.top]);

    // Create and update bars
    const bars = svg
      .selectAll('g')
      .data(barData, (d: any) => d.uniqueId)
      .enter()
      .append('g');

    // Initial position based on previous index
    bars.attr('transform', (d) => 
      `translate(${xScale(String(d.previousIndex))}, 0)`
    );

    // Add rectangles
    bars
      .append('rect')
      .attr('y', (d) => yScale(d.value))
      .attr('height', (d) => height - margin.bottom - yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('fill', '#74c0fc') // Start with default color
      .attr('opacity', 1);

    // Add value labels
    bars
      .append('text')
      .attr('x', xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.value) - 5)
      .attr('text-anchor', 'middle')
      .text((d) => d.value);

    // Animation sequence
    bars
      .filter(d => d.isActive) // Select only active bars
      .transition()
      .duration(600) // Highlight duration
      .select('rect')
      .attr('fill', '#ff6b6b') // Highlight color
      .transition()
      .duration(700) // Movement duration
      .attr('fill', d => d.isSorted ? '#51cf66' : '#74c0fc'); // Final color

    // Move all bars to their new positions
    bars.transition()
      .duration(700) // Same duration as the color transition
      .attr('transform', (d) => `translate(${xScale(String(d.index))}, 0)`);

    // Update colors for non-active bars
    bars
      .filter(d => !d.isActive)
      .select('rect')
      .transition()
      .duration(700)
      .attr('fill', d => d.isSorted ? '#51cf66' : '#74c0fc');

  }, [stepsList, step, mergeRanges]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ 
        backgroundColor: '#f8f9fa',
        display: 'block',
        margin: '0 auto'
      }}
    />
  );
};

export default D3SortVisualizer;