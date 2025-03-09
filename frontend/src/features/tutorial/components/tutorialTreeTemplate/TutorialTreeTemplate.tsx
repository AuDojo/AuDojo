import { HierarchyLink, HierarchyNode, curveLinear, hierarchy, link, select, tree } from "d3";
import { Tree } from "../../types";
import { useEffect, useRef } from "react";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import styles from "./TutorialTreeTemplate.module.css";

const inputSize = 35;
const yOffset = 115;
const exponentialDecrease = 0.5;
const horizontalSpacing = 150;
const width = 400;
const height = 500;

const TutorialTreeTemplate = ({ treeData }: { treeData: Tree }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const dimensions = useResizeObserver(svgRef);

  useEffect(() => {
    console.log("use effect fired", treeData);
    const svg = select(svgRef.current);
    if (!dimensions) return;

    svg.selectAll("*").remove();

    // process d3 hiearchy without null values
    const root = hierarchy<Tree>(treeData, (d) => d.children?.filter((child) => child !== null));

    // center relative to viewbox
    const centerX = dimensions.width / 2;

    const treeLayout = tree<Tree>()
      .size([dimensions.width * 0.8, dimensions.height])
      .separation((a, b) => (a.parent === b.parent ? 1.5 : 2));

    treeLayout(root);

    // Dann manuell korrigieren, um Links/Rechts-Positionierung zu erzwingen
    const manualPositioning = (node: HierarchyNode<Tree>, level: number) => {
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

    const linkGenerator = link<HierarchyLink<Tree>, HierarchyNode<Tree>>(curveLinear)
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
      .append("xhtml:span")
      .attr("fill", "#0000")
      .attr("class", styles.input)
      .attr("value", (node) => node.data.value);

    nodes.forEach((d) => {
      const children = d.data.children ?? [null, null];

      const x = d.x;
      const y = d.y;

      if (!x || !y) return;

      // Linker Button (als SVG-Kreis)
      if ((children[0]?.value ?? null) === null) {
        const leftGroup = svg.append("g").attr("transform", `translate(${x - 12}, ${y + 24})`);
        leftGroup
          .append("circle")
          .attr("fill", "#ecf0f1")
          .attr("stroke", "rgb(0, 63, 87, 0.8)")
          .attr("stroke-width", 1.5)
          .attr("cursor", "pointer");

        leftGroup
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .attr("font-size", "14px")
          .attr("pointer-events", "none");
      }
      // Rechter Button (als SVG-Kreis)
      if ((children[1]?.value ?? null) === null) {
        const rightGroup = svg.append("g").attr("transform", `translate(${x + 12}, ${y + 24})`);
        rightGroup
          .append("circle")
          .attr("fill", "#ecf0f1")
          .attr("stroke", "rgb(0, 63, 87, 0.8)")
          .attr("stroke-width", 1.5)
          .attr("cursor", "pointer")
          .attr("position", "right");

        rightGroup
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .attr("font-size", "14px")
          .attr("pointer-events", "none");
        // .text("+");
      }
    });
  }, [dimensions, treeData]);

  return <svg className={styles.svg} ref={svgRef} width={width} height={height}></svg>;
};

export default TutorialTreeTemplate;
