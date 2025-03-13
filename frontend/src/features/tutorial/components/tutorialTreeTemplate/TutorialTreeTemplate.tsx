import { useResizeObserver } from "@/hooks/useResizeObserver";
import { HierarchyLink, HierarchyNode, curveLinear, hierarchy, link, select, tree } from "d3";
import { useEffect, useRef } from "react";
import { Tree } from "../../types";
import styles from "./TutorialTreeTemplate.module.css";

const width = 400;
const height = 500;
export const nodeSize = { width: 60, height: 65 };

const TutorialTreeTemplate = ({ treeData }: { treeData: Tree }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const dimensions = useResizeObserver(svgRef);

  useEffect(() => {
    if (!dimensions) return;
    const rootPosition = { x: dimensions.width / 2, y: 28 };
    const svg = select(svgRef.current).append("g").attr("transform", `translate(${rootPosition.x}, ${rootPosition.y})`);

    const root = hierarchy<Tree>(treeData);
    const treeLayout = tree<Tree>()
      .size([dimensions.width, dimensions.height])
      .separation((a, b) => (a.parent === b.parent ? 2 : 2))
      .nodeSize([nodeSize.width, nodeSize.height]);
    treeLayout(root);

    // function that, when called with link data, produces a valid SVG path string
    const linkGenerator = link<HierarchyLink<Tree>, HierarchyNode<Tree>>(curveLinear)
      .x((node) => node.x ?? 0)
      .y((node) => node.y ?? 0);

    svg
      .selectAll(".link")
      .data(root.links().filter((node) => node.target.data.value !== null))
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("d", (link) => {
        return linkGenerator(link) ?? "";
      });

    const gNode = svg
      .selectAll(".node")
      .data(root.descendants().filter((node) => node.data.value !== null))
      .join("g")
      .attr("class", styles.node)
      .attr("transform", (node) => `translate(${node.x}, ${node.y})`);

    gNode
      .append("circle")
      .attr("r", 20)
      .attr("fill", (node) => {
        return node.data.color ?? "#ecf0f1";
      });

    gNode
      .append("text")
      .attr("dy", 7)
      .attr("class", styles.text)
      .text((d) => d.data.value);

    //clean up
    return () => {
      svg.selectAll("*").remove();
    };
  }, [dimensions, treeData]);

  return <svg className={styles.svg} ref={svgRef} width={width} height={height}></svg>;
};

export default TutorialTreeTemplate;
