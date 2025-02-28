import { useEffect, useRef, useState } from "react";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import style from "../HomeButtons.module.css";
import classNames from "classnames/bind";
import { select, hierarchy, tree, link, curveLinear, HierarchyLink, HierarchyNode } from "d3";
import {
  TreeNode,
  initialData,
  deleteNode,
  restructureNode,
  insertFirstNode,
  insertSecondNode,
  circleRadius,
  nodeSize,
  durationTreeOperation,
} from "./constants";

const cx = classNames.bind(style);

const AVLTree = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const stepRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // start loop on hover, stop on unhover
  const [currentData, setCurrentData] = useState(initialData);

  const dimensions = useResizeObserver(svgRef);

  const processes = [deleteNode, restructureNode, insertFirstNode, insertSecondNode, initialData];

  useEffect(() => {
    if (!svgRef.current || !dimensions) return;

    // contains data: height, depth, data, parent about itself and all its children
    const root = hierarchy<TreeNode>(currentData);

    // set treeLayout size to svg size
    const treeLayout = tree<TreeNode>()
      .size([dimensions.width, dimensions.height])
      .nodeSize([nodeSize.width, nodeSize.height]); // (need to manually center root)

    treeLayout(root);

    // console.log(root.links()); // contains {source_node, target_node} pairs
    // console.log(root.descendants()); // arrays of nodes

    // function that, when called with link data, produces a valid SVG path string
    const linkGenerator = link<HierarchyLink<TreeNode>, HierarchyNode<TreeNode>>(curveLinear)
      .x((node) => node.x ?? 0)
      .y((node) => node.y ?? 0);

    const rootPosition = { x: dimensions.width / 2, y: 35 };

    // move root to desired position
    const svg = select(svgRef.current).append("g").attr("transform", `translate(${rootPosition.x}, ${rootPosition.y})`);

    // create links (linkGenerator helps to determines the path)
    svg
      .selectAll(cx("link"))
      .data(root.links().filter((link) => link.target.data.value !== null))
      .join("path")
      .attr("class", cx("link"))
      .attr("d", (link) => linkGenerator(link));

    // bind Node data to groups and add circles
    svg
      .selectAll(cx("node"))
      .data(root.descendants().filter((node) => node.data.value !== null))
      .join("g")
      .attr("transform", (node) => `translate(${node.x}, ${node.y})`)
      .append("circle")
      .attr("r", circleRadius)
      .attr("class", cx("circle"));

    // clean up on unmount
    return () => {
      svg.selectAll("*").remove();
    };
  }, [dimensions, currentData]);

  /** ----------- (animation) Change tree data on hover ----------- s*/

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleHovering = () => {
    clearTimer();

    timerRef.current = setInterval(() => {
      setCurrentData(processes[stepRef.current]);
      stepRef.current = (stepRef.current + 1) % processes.length;
    }, durationTreeOperation);
  };

  const handleStopHovering = () => {
    clearTimer();
    stepRef.current = 0;
    setCurrentData(initialData);
  };

  return (
    <svg
      ref={svgRef}
      className={cx("home-button-img", "treetutor-img")}
      onMouseEnter={handleHovering}
      onMouseLeave={handleStopHovering}
    ></svg>
  );
};

export default AVLTree;
