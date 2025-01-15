import React from "react";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import style from "./BinaryTemplate.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
interface Node {
  x: number;
  y: number;
  parentX?: number;
  parentY?: number;
}
const BinaryTemplate = () => {
  const [nodes, setNodes] = useState<Node[]>([{ x: 500, y: 50 }]);

  const addNode = (parent: Node, direction: "left" | "right") => {
    const offsetX = direction === "left" ? -50 : 50;
    const offsetY = 50;
    const newNode = {
      x: parent.x + offsetX,
      y: parent.y + offsetY,
      parentX: parent.x,
      parentY: parent.y,
    };
    setNodes((prev) => [...prev, newNode]);
  };

  return (
    <svg style={{ backgroundColor: "rgb(92, 57, 57)" }} width="100%" height="100vh">
      {nodes.map((node, index) => (
        <React.Fragment key={index}>
          {node.parentX !== undefined && node.parentY !== undefined && (
            <line x1={node.parentX} y1={node.parentY} x2={node.x} y2={node.y} stroke="black" />
          )}
          <circle cx={node.x} cy={node.y} r={20} fill="white" stroke="black">
            <text x={node.x - 5} y={node.y + 5} fontSize="12">
              {index + 1}
            </text>
          </circle>
          <g transform={`translate(${node.x - 25}, ${node.y + 17})`}>
            <FaArrowDown
              className={cx("icon", "left")}
              style={{ transform: "rotate(45deg)" }}
              onClick={() => addNode(node, "left")}
            />
          </g>
          <g transform={`translate(${node.x + 10}, ${node.y + 17})`}>
            <FaArrowDown
              className={cx("icon", "right")}
              style={{ transform: "rotate(45deg)" }}
              onClick={() => addNode(node, "right")}
            />
          </g>
        </React.Fragment>
      ))}
    </svg>
  );
  return <div>BinaryTemplate</div>;
};

export default BinaryTemplate;
