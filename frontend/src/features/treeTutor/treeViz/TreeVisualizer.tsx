import { useResizeObserver } from "@/hooks/useResizeObserver";
import { HierarchyLink, HierarchyNode, curveLinear, hierarchy, link, select, tree } from "d3";
import { useEffect, useRef, useState } from "react";
import styles from "./TreeVisualizer.module.css";

interface TreeNode {
  value: number | null;
  /** (Optional) Left and right child */
  children?: [TreeNode, TreeNode];
}

/**
 * A React component that visualizes an AVL tree using D3.js.
 * It initializes with a predefined tree structure and renders it
 * as an SVG element. The tree layout adjusts based on container size.
 * Nodes and links are dynamically filtered to exclude null values.
 */
const TreeVisualizer = () => {
  // TODO: Split this component (data, type(TreeNode), custom hook)
  const initialData: TreeNode = {
    value: 10,
    children: [
      {
        value: 5,
        children: [
          {
            value: 3,
            children: [
              {
                value: 1,
              },
              {
                value: 4,
                children: [
                  {
                    value: 3.5,
                  },
                  {
                    value: 4.5,
                  },
                ],
              },
            ],
          },
          {
            value: 8,
          },
        ],
      },
      {
        value: 15,
        children: [
          {
            value: 12,
            children: [
              {
                value: 11,
              },
              {
                value: null,
              },
            ],
          },
          {
            value: 18,
          },
        ],
      },
    ],
  };

  // TODO: Later on change to [treeData, setTreeData]
  const [treeData] = useState<TreeNode>(initialData);
  const svgRef = useRef<SVGSVGElement>(null);
  const dimensions = useResizeObserver(svgRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    // use d3.hierarchy to create a hierarchial layout with nodes(data, children), has utilities like descendants and links
    const root = hierarchy<TreeNode>(treeData);
    // use d3.tree to create a tree layout. Gives us x and y coordinates of nodes
    // TODO: calculate size of the tree based on the number of nodes and height
    const treeLayout = tree<TreeNode>()
      .separation((a, b) => (a.parent == b.parent ? 2 : 3))
      .size([dimensions.width, dimensions.height]);
    treeLayout(root);

    // console.log("root:", root);
    // console.log("root.descendants():", root.descendants());
    // console.log("root.links(): ", root.links());

    // Filter out nodes and links with no value (and no coordinates)
    const nodes = root.descendants().filter((d) => d.data.value !== null && d.x !== undefined && d.y !== undefined);
    const links = root.links().filter((link) => link.target.data.value !== null);

    const linkGenerator = link<HierarchyLink<TreeNode>, HierarchyNode<TreeNode>>(curveLinear)
      .x((node) => node.x ?? 0)
      .y((node) => node.y ?? 0);

    // links (have to be rendered first, otherwise they overlap with nodes)
    svg
      .selectAll(styles.link)
      .data(links)
      .join("path")
      .attr("class", styles.link)
      .attr("d", (link) => linkGenerator(link));

    // nodes
    const gNodes = svg
      .selectAll(styles.node)
      .data(nodes)
      .join("g")
      .attr("class", styles.node)
      .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

    // node circles and text (remove later)
    gNodes.append("circle").attr("r", 20);
    gNodes
      .append("text")
      .attr("class", styles.text)
      .attr("dy", 7)
      .text((d) => d.data.value);

    // node inputs
    // const inputs =
    gNodes
      .append("foreignObject")
      .attr("width", 160)
      .attr("height", 200)
      .append("xhtml:input")
      .attr("value", (node) => node.data.value);

    // Cleanup function: remove all elements from the svg
    return () => {
      svg.selectAll("*").remove();
    };
  }, [dimensions, treeData]);

  return <svg className={styles.svg} ref={svgRef}></svg>;
};

export default TreeVisualizer;
