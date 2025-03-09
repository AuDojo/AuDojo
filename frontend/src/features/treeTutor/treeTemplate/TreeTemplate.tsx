import { useResizeObserver } from "@/hooks/useResizeObserver";
import { HierarchyLink, HierarchyNode, curveLinear, hierarchy, link, select, tree } from "d3";
import { useCallback, useEffect, useRef } from "react";
import { TreeNode, addNode, deleteNode, findNode, hasValidXY, updateNode } from "../utils/treeUtils";
import styles from "./TreeTemplate.module.css";

interface TreeTemplateProps {
  treeData: TreeNode;
  onTreeUpdate: (newTree: TreeNode) => void;
}

const inputSize = 35;
const addButtonRadius = 8;
const yOffset = 105;
const exponentialDecrease = 0.5;
const horizontalSpacing = 145;

const TreeTemplate = ({ treeData, onTreeUpdate }: TreeTemplateProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const dimensions = useResizeObserver(svgRef);

  const handleAddNode = useCallback(
    (nodeId: string, position: "left" | "right") => {
      // Clone the current tree data
      const treeDataTyped: TreeNode = treeData;
      const clone = structuredClone(treeDataTyped);

      // Find the target node using the ID
      const foundNode = findNode(clone, nodeId);

      if (!foundNode) {
        console.warn(`Node with ID ${nodeId} not found!`);
        return;
      }

      const newValue = 0;

      // Create updated tree
      const updatedTree = addNode(clone, nodeId, newValue, position);

      // Pass the new tree to the onTreeUpdate function
      onTreeUpdate(updatedTree);
    },
    [treeData, onTreeUpdate]
  );

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    svg.selectAll("*").remove();

    // process d3 hiearchy without null values
    const root = hierarchy<TreeNode>(treeData, (d) => d.children?.filter((child) => child !== null));

    // const width = 800;
    // const height = 630;

    // svg.attr("width", "100%").attr("height", "100%");

    // center relative to viewbox
    const centerX = dimensions.width / 2;

    // svg.attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);

    const treeLayout = tree<TreeNode>()
      .size([dimensions.width * 0.8, dimensions.height])
      .separation((a, b) => (a.parent === b.parent ? 1.5 : 2));

    treeLayout(root);

    // Dann manuell korrigieren, um Links/Rechts-Positionierung zu erzwingen
    const manualPositioning = (node: HierarchyNode<TreeNode>, level: number) => {
      // Root node handling
      if (!node.parent) {
        node.x = centerX;
        node.y = 35;

        if (node.children) {
          node.children.forEach((child) => {
            if (typeof node.x === "number" && typeof node.y === "number") {
              if (child.data.position === "left") {
                // Left child
                child.x = node.x - horizontalSpacing;
              } else {
                // Right child
                child.x = node.x + horizontalSpacing;
              }

              child.y = node.y + yOffset;

              manualPositioning(child, level + 1);
            }
          });
        }
      }
      // For all other nodes with parent
      else if (node.parent) {
        // spacing between nodes declines exponentially
        const levelSpacing = horizontalSpacing * Math.pow(exponentialDecrease, level);

        if (node.children) {
          node.children.forEach((child) => {
            if (typeof node.x === "number" && typeof node.y === "number") {
              if (child.data.position === "left") {
                child.x = node.x - levelSpacing;
              } else {
                child.x = node.x + levelSpacing;
              }

              child.y = node.y + yOffset;

              manualPositioning(child, level + 1);
            }
          });
        }
      }
    };

    manualPositioning(root, 0);

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
    // gNodes.append("circle").attr("r", 20);
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
      .attr("width", inputSize)
      .attr("height", inputSize)
      .attr("transform", `translate(${-inputSize / 2}, ${-inputSize / 2})`)
      .append("xhtml:input")
      .attr("class", styles.input)
      .attr("value", (node) => node.data.value)
      .on("blur", function (event, d) {
        if (typeof d.data.id !== "string" || typeof d.data.value !== "number") {
          return;
        }

        const id = d.data.id;
        const inputValue = event.target.value;
        const treeClone = structuredClone(treeData);

        if (!inputValue) {
          onTreeUpdate(deleteNode(treeClone, id));
        } else {
          const newValue = Number(inputValue);
          onTreeUpdate(updateNode(treeClone, id, newValue));
        }
      });

    const validNodes = nodes.filter(hasValidXY);

    validNodes.forEach((d) => {
      const children = d.data.children ?? [null, null];
      const nodeId = d.data.id;
      const depth = d.data.depth;

      if (typeof nodeId !== "string") {
        return;
      }

      const x = d.x;
      const y = d.y;

      // Linker Button (als SVG-Kreis)
      if ((children[0]?.value ?? null) === null && depth < 4) {
        const leftGroup = svg
          .append("g")
          .attr("transform", `translate(${x - 12}, ${y + 24})`)
          .attr("class", styles.addButtonText);
        leftGroup
          .append("circle")
          .attr("class", `btn-left-${nodeId}`)
          .attr("r", addButtonRadius)
          .attr("position", "left")
          .on("click", function (event) {
            event.stopPropagation();
            // // console.log(` ID from on click Event: ${nodeId}`);
            handleAddNode(nodeId, "left");
          });

        leftGroup.append("text").text("+");
      }
      // Rechter Button (als SVG-Kreis)
      if ((children[1]?.value ?? null) === null && depth < 4) {
        const rightGroup = svg
          .append("g")
          .attr("transform", `translate(${x + 12}, ${y + 24})`)
          .attr("class", styles.addButtonText);
        rightGroup
          .append("circle")
          .attr("class", `btn-right-${nodeId}`)
          .attr("r", addButtonRadius)
          .attr("position", "right")
          .on("click", function (event) {
            event.stopPropagation();
            // // console.log(` ID from on click Event: ${nodeId}`);
            handleAddNode(nodeId, "right");
          });
        rightGroup.append("text").text("+");
      }
    });
  }, [dimensions, treeData, onTreeUpdate, handleAddNode]);

  return (
    // <div className={styles.treeTemplateContainer}>
    <svg className={styles.svg} ref={svgRef}></svg>
    // </div>
  );
};

export default TreeTemplate;
