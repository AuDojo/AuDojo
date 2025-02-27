import { useEffect, useRef } from "react";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import style from "../HomeButtons.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

/*const data = {
  value: 10,
  children: []
}; */

const AVLTree = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const dimensions = useResizeObserver(svgRef);

  useEffect(() => {
    if (!svgRef.current || !dimensions) return;

    // const svg = select(svgRef.current);
  }, [dimensions]);

  return <svg ref={svgRef} className={cx("home-button-img", "treetutor-img")}></svg>;
};

export default AVLTree;
