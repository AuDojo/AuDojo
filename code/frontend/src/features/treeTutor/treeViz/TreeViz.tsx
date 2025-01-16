import * as d3 from "d3";
import { useEffect, useRef } from "react";
import styles from "./TreeViz.module.css";

interface TreeNode {
  name: string;
  id?: number;
  children?: TreeNode[];
  parent?: TreeNode;
  depth?: number;
  height?: number;
  x?: number;
  y?: number;
}

const treeData: TreeNode = {
  name: "Root",
  children: [
    {
      name: "Child 1",
      children: [
        {
          name: "Grandchild 1.1",
          children: [
            {
              name: "Great-grandchild 1.1.1",
            },
          ],
        },
        {
          name: "Grandchild 1.2",
        },
      ],
    },
    {
      name: "Child 2",
    },
  ],
};

const TreeViz = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const root = d3.hierarchy(treeData);
    const treeLayout = d3.tree<TreeNode>().size([200, 200]);
    treeLayout(root);

    console.log("treeLayout", treeLayout);
    console.log("root", root);
    console.log("root.links()", root.links());

    const g = svg.append("g").attr("transform", "translate(40, 40)");

    // links
    g.selectAll(styles.link)
      .data(root.links())
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y)
      .attr("stroke", "black");

    // nodes
    const nodes = g
      .selectAll(styles.node)
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", styles.node)
      .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

    nodes.append("circle").attr("r", 5);

    nodes
      .append("text")
      .attr("class", styles.text)
      .attr("dy", -10)
      .text((d) => `${d.data.name}`);
  }, [treeData]);
  // const tree = d3.tree().separation(function () {
  //   return 40;
  // });

  // // Select the SVG element in the HTML and append a group element to it
  // const svg = d3.select(svgRef.current);
  // const mainGroup = svg.append("g").attr("transform", "translate(40, 40)");

  // // Append groupe elements for links and nodes within the main group
  // const gLinks = mainGroup.append("g");
  // const gNodes = mainGroup.append("g");
  // d3.hierarchy;

  return <svg ref={svgRef} width={800} height={600}></svg>;
};

export default TreeViz;
