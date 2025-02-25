import { useResizeObserver } from "@/hooks/useResizeObserver";
import { HierarchyLink, HierarchyNode, curveLinear, hierarchy, link, select, tree } from "d3";
import { useEffect, useRef, useState } from "react";
import styles from "./TreeTemplate.module.css";
import { addNode, hasValidXY, updateNode, deleteNode, TreeNode } from "../utils/treeUtils";

/**
 * A React component that visualizes an AVL tree using D3.js.
 * It initializes with a predefined tree structure and renders it
 * as an SVG element. The tree layout adjusts based on container size.
 * Nodes and links are dynamically filtered to exclude null values.
 */
const TreeTemplate = () => {
  // TODO: Split this component (data, type(TreeNode), custom hook)
  /** const initialData: TreeNode = {
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
*/

  const initialData: TreeNode = { value: 0 };
  // TODO: Later on change to [treeData, setTreeData]
  const [treeData, setTreeData] = useState<TreeNode>(initialData);
  const svgRef = useRef<SVGSVGElement>(null);
  const dimensions = useResizeObserver(svgRef);

  const handleAddNode = (nodeValue: number | null, position: "left" | "right") => {
    console.log(`Button clicked: Add node to ${position} of node with value ${nodeValue}`);
    if (nodeValue == null) {
      return;
    }

    setTreeData((prevTree) => {
      const clone = structuredClone(prevTree);
      // Neuen Wert basierend auf Position berechnen
      const newValue = position === "left" ? nodeValue - 1 : nodeValue + 1;
      const index = position === "left" ? 0 : 1;

      // Knoten zum Baum hinzufügen
      const updatedTree = addNode(clone, nodeValue, newValue, index);
      return updatedTree;
    });
  };

  useEffect(() => {
    console.log("use effect fired", treeData);
    const svg = select(svgRef.current);
    if (!dimensions) return;

    svg.selectAll("*").remove();

    console.log(dimensions.x);
    console.log(dimensions.y);

    // use d3.hierarchy to create a hierarchial layout with nodes(data, children), has utilities like descendants and links
    const root = hierarchy<TreeNode>(treeData);
    // use d3.tree to create a tree layout. Gives us x and y coordinates of nodes
    // TODO: calculate size of the tree based on the number of nodes and height
    const treeLayout = tree<TreeNode>()
      .separation((a, b) => (a.parent == b.parent ? 2 : 3))
      .size([500, 400]);
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
      .selectAll("links")
      .data(links)
      .join("path")
      .attr("class", styles.link)
      .attr("d", (link) => linkGenerator(link));

    // nodes
    const gNodes = svg
      .selectAll("nodes")
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
      .attr("class", styles.inputContainer)
      .attr("width", 36)
      .attr("height", 36)
      .attr("transform", `translate(-18, -18)`)
      .append("xhtml:input")
      .attr("class", styles.input)
      .attr("value", (node) => node.data.value)
      .on("blur", function (event, d) {
        const newValue = event.target.value ? Number(event.target.value) : null;

        if (typeof d.data.value !== "number") {
          return;
        }
        const value = d.data.value;

        setTreeData((prevTree) => {
          const clone = structuredClone(prevTree);
          const updatedTree =
            newValue === null ? (deleteNode(clone, value) ?? prevTree) : updateNode(clone, value, newValue);

          console.log(clone);
          return updatedTree;
        });
        console.log(newValue);
        console.log(updateNode);
      });

    const validNodes = nodes.filter(hasValidXY);

    validNodes.forEach((d) => {
      const children = d.data.children ?? [null, null];
      const nodeValue = d.data.value;

      const x = d.x;
      const y = d.y;

      // Linker Button (als SVG-Kreis)
      if ((children[0]?.value ?? null) === null) {
        svg
          .append("circle")
          .attr("class", `btn-left-${nodeValue}`)
          .attr("cx", x - 15)
          .attr("cy", y + 30)
          .attr("r", 10)
          .attr("fill", "#ecf0f1")
          .attr("stroke", "rgb(0, 63, 87)")
          .attr("stroke-width", 2)
          .attr("cursor", "pointer")
          .on("click", function (event) {
            event.stopPropagation();
            handleAddNode(nodeValue, "left");
          });

        svg
          .append("text")
          .attr("x", x - 15)
          .attr("y", y + 34)
          .attr("text-anchor", "middle")
          .attr("font-size", "14px")
          .attr("pointer-events", "none")
          .text("+");
      }

      // Rechter Button (als SVG-Kreis)
      if ((children[1]?.value ?? null) === null) {
        svg
          .append("circle")
          .attr("class", `btn-right-${nodeValue}`)
          .attr("cx", x + 15)
          .attr("cy", y + 30)
          .attr("r", 10)
          .attr("fill", "#ecf0f1")
          .attr("stroke", "rgb(0, 63, 87)")
          .attr("stroke-width", 2)
          .attr("cursor", "pointer")
          .on("click", function (event) {
            event.stopPropagation();
            handleAddNode(nodeValue, "right");
          });

        svg
          .append("text")
          .attr("x", x + 15)
          .attr("y", y + 34)
          .attr("text-anchor", "middle")
          .attr("font-size", "14px")
          .attr("pointer-events", "none")
          .text("+");
      }
    });
  }, [dimensions, treeData]);

  return <svg className={styles.svg} ref={svgRef}></svg>;
};

export default TreeTemplate;
