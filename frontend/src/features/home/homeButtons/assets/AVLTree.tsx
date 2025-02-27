import { useEffect, useRef } from "react";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import style from "../HomeButtons.module.css";
import classNames from "classnames/bind";
import { select, hierarchy, tree, link, curveLinear, HierarchyLink, HierarchyNode } from "d3";

const cx = classNames.bind(style);

// Override type TreeNode
interface TreeNode {
  value: number | null;
  children?: [TreeNode, TreeNode];
}

const data: TreeNode = {
  value: 10,
  children: [
    {
      value: 9,
      children: [{ value: 1 }, { value: null }],
    },
    {
      value: 15,
      children: [
        {
          value: 13,
          children: [{ value: 12 }, { value: null }],
        },
        { value: 18 },
      ],
    },
  ],
};

const nodeSize = { width: 27, height: 52 };
const circleRadius = 10;

const AVLTree = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const dimensions = useResizeObserver(svgRef);

  useEffect(() => {
    if (!svgRef.current || !dimensions) return;

    // construct the root node (which contains data: height, depth, data, parent about itself and all its children)
    const root = hierarchy<TreeNode>(data);

    // set treeLayout size to svg size
    const treeLayout = tree<TreeNode>()
      .size([dimensions.width, dimensions.height])
      .nodeSize([nodeSize.width, nodeSize.height]) // (need to manually center root)
      .separation((a, b) => (a.parent === b.parent ? 2 : 3));

    // compute the layout
    treeLayout(root);

    // console.log(root.links()); // contains {source_node, target_node} pairs
    // console.log(root.descendants()); // arrays of nodes

    // function that, when called with link data, produces a valid SVG path string
    const linkGenerator = link<HierarchyLink<TreeNode>, HierarchyNode<TreeNode>>(curveLinear)
      .x((node) => node.x ?? 0)
      .y((node) => node.y ?? 0);

    const rootPosition = { x: dimensions.width / 2, y: 35 };

    const svg = select(svgRef.current).append("g").attr("transform", `translate(${rootPosition.x}, ${rootPosition.y})`);

    // create links (linkGenerator helps to determines the path)
    svg
      .selectAll(cx("link"))
      .data(root.links().filter((link) => link.target.data.value !== null))
      .join("path")
      .attr("class", cx("link"))
      .attr("d", (link) => linkGenerator(link));

    // bind Node data to groups and add circles
    const groupNodes = svg
      .selectAll(cx("node"))
      .data(root.descendants().filter((node) => node.data.value !== null))
      .join("g")
      .attr("class", cx("node"))
      .attr("transform", (node) => `translate(${node.x}, ${node.y})`);

    groupNodes.append("circle").attr("r", circleRadius);

    // groupNodes
    //   .append("text")
    //   .text((node) => node.data.value)
    //   .attr("text-anchor", "middle")
    //   .attr("alignment-baseline", "central");

    // clean up on unmount
    return () => {
      svg.selectAll("*").remove();
    };
  }, [dimensions]);

  return <svg ref={svgRef} className={cx("home-button-img", "treetutor-img")}></svg>;
};

export default AVLTree;
