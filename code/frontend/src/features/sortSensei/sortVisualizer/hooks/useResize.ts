import { useEffect, useState } from "react";

interface useResizeProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  totalBarsWidth: number;
}
const innerSideMargin = 25;
const outerSideMargin = 10;

/**
 * A hook that returns the size of a container based on the width of its contents and the size of the container itself.
 *
 * @return {{ width, height }} The size of the container.
 */
const useResize = ({ containerRef, totalBarsWidth }: useResizeProps) => {
  const [containerSize, setContainerSize] = useState({
    width: 790,
    height: 240,
  });

  useEffect(() => {
    const handleResize = () => {
      // Check if containerRef is assigned to a DOM element
      if (containerRef.current) {
        setContainerSize({
          // ensure the width doesn't exceed the available space
          width: Math.min(totalBarsWidth + innerSideMargin * 2, containerRef.current.clientWidth - outerSideMargin * 2),
          height: 240,
        });
      }
    };
    handleResize();

    // Subscribe to the resize event
    window.addEventListener("resize", handleResize);

    // Cleanup: Remove the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, [totalBarsWidth, containerRef]);

  return containerSize;
};

export default useResize;
