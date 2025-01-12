import { useMemo } from "react";
import { scaleBand, scaleLinear, max, range } from "d3";
import { margin, adjustedMarginLeft, scaleBandPadding, textMarginTop, textMarginBottom } from "../constants";

const useScales = ({
  containerSize,
  sharedArray,
}: {
  containerSize: { width: number; height: number };
  sharedArray: number[];
}) => {
  //use useMemo to memoize the result of the scales
  const xScale = useMemo(
    () =>
      scaleBand<number>()
        .domain(range(sharedArray.length))
        .range([margin.left, containerSize.width - adjustedMarginLeft])
        .padding(scaleBandPadding),
    [containerSize.width, sharedArray.length]
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, max(sharedArray) ?? containerSize.height])
        .range([containerSize.height - margin.bottom, margin.top + textMarginTop + textMarginBottom]),
    [containerSize.height, sharedArray]
  );

  return {
    xScale,
    yScale,
  };
};

export default useScales;
