import { useResizeObserver } from "@/hooks/useResizeObserver";
import { HierarchyLink, HierarchyNode, curveLinear, hierarchy, link, select, tree } from "d3";
import { useEffect, useRef, useState } from "react";
import styles from "./TreeTemplate.module.css";
import { addNode, deleteNode, findNode, hasValidXY, updateNode, TreeNode } from "../utils/treeUtils";

const TreeTemplate = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const dimensions = useResizeObserver(svgRef);

  const root = { value: 0, height: 0, id: crypto.randomUUID() };

  const [treeData, setTreeData] = useState<TreeNode>(root);

  const handleAddNode = (nodeId: string, position: "left" | "right") => {
    setTreeData((prevTree) => {
      const clone = structuredClone(prevTree);
      // Find the target node using the ID
      const foundNode = findNode(clone, nodeId);

      if (!foundNode) {
        console.warn(`Node with ID ${nodeId} not found!`);
        return clone;
      }

      const newValue = 0;
      const index = position === "left" ? 0 : 1;

      const updatedTree = addNode(clone, nodeId, newValue, index);

      return updatedTree;
    });
  };

  useEffect(() => {
    console.log("use effect fired", treeData);
    const svg = select(svgRef.current);
    // if (!dimensions) return;

    svg.selectAll("*").remove();

    //console.log(dimensions.x);
    //console.log(dimensions.y);

    // d3 hierarchy ohne null values verarbeiten
    const root = hierarchy<TreeNode>(treeData, (d) => d.children?.filter((child) => child !== null));

    const width = 800;
    const height = (root.height + 1) * 120;
    const centerX = width / 2;

    const treeLayout = tree<TreeNode>()
      .size([width * 0.8, height])
      .separation((a, b) => (a.parent === b.parent ? 1.5 : 2));

    treeLayout(root);

    if (root.x !== undefined) {
      const xOffset = centerX - root.x;
      root.descendants().forEach((d) => {
        if (d.x !== undefined && d.y !== undefined) {
          d.x += xOffset - 110;
          d.y += 23;
        }
      });
    }

    svg.attr("width", width).attr("height", height);

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
        if (typeof d.data.id !== "string" || typeof d.data.value !== "number") {
          return;
        }

        const id = d.data.id;
        const inputValue = event.target.value;

        if (!inputValue) {
          // Falls das Eingabefeld leer ist, entferne den Knoten
          setTreeData((prevTree) => deleteNode(structuredClone(prevTree), id));
        } else {
          // Falls ein Wert vorhanden ist, aktualisiere den Knoten
          const newValue = Number(inputValue);
          setTreeData((prevTree) => updateNode(structuredClone(prevTree), id, newValue));
        }
      });

    const validNodes = nodes.filter(hasValidXY);

    validNodes.forEach((d) => {
      const children = d.data.children ?? [null, null];
      const nodeId = d.data.id;

      if (typeof nodeId !== "string") {
        return;
      }

      const x = d.x;
      const y = d.y;

      // Linker Button (als SVG-Kreis)
      if ((children[0]?.value ?? null) === null) {
        svg
          .append("circle")
          .attr("class", `btn-left-${nodeId}`)
          .attr("cx", x - 15)
          .attr("cy", y + 30)
          .attr("r", 10)
          .attr("fill", "#ecf0f1")
          .attr("stroke", "rgb(0, 63, 87)")
          .attr("stroke-width", 2)
          .attr("cursor", "pointer")
          .on("click", function (event) {
            event.stopPropagation();
            console.log(` ID from on click Event: ${nodeId}`);
            handleAddNode(nodeId, "left");
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
          .attr("class", `btn-right-${nodeId}`)
          .attr("cx", x + 15)
          .attr("cy", y + 30)
          .attr("r", 10)
          .attr("fill", "#ecf0f1")
          .attr("stroke", "rgb(0, 63, 87)")
          .attr("stroke-width", 2)
          .attr("cursor", "pointer")
          .on("click", function (event) {
            event.stopPropagation();
            console.log(` ID from on click Event: ${nodeId}`);
            handleAddNode(nodeId, "right");
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
