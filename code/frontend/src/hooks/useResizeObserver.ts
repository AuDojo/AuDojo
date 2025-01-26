import React, { useEffect, useState } from "react";

/**
 * A custom hook that observes and returns the current dimensions of a DOM element.
 *
 * @param ref - A React reference to the DOM element whose size is to be observed.
 * @returns The dimensions of the element as a `DOMRectReadOnly` object.
 */
export const useResizeObserver = (ref: React.RefObject<Element | null>) => {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly>();
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });

    if (observeTarget) {
      resizeObserver.observe(observeTarget);
      return () => {
        resizeObserver.unobserve(observeTarget);
      };
    }
  }, [ref]);
  return dimensions;
};
