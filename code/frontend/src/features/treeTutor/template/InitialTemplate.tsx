import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import style from "./InitialTemplate.module.css";

import classNames from "classnames/bind";
import React from "react";

// const containerSize: { width: number; height: number } = {
//   width: 300,
//   height: 300,
// };
const cx = classNames.bind(style);
// const iconLeft = <FaArrowDown className={cx("icon", "left")} />;
// const iconRight = <FaArrowDown className={cx("icon", "right")} />;
interface Node {
  x: number;
  y: number;
  parentX?: number;
  parentY?: number;
}

const InitialTemplate = () => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [title, setTitle] = useState<string>("");
  // const ref = useRef<HTMLDialogElement>(null);
  // const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (isOpen) {
  //     ref.current?.showModal(); // Show the modal if openModal is true
  //   } else {
  //     ref.current?.close(); // Close the modal if openModal is false
  //   }
  // }, [isOpen]);

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const regex = /^[0-9]*$/;
  //   if (!regex.test(event.target.value)) {
  //     return;
  //   }
  // };

  // return (
  //   <>
  //     <h1 style={{ position: "fixed", top: "100px", left: "10px" }}>{title}</h1>
  //     <button onClick={() => setIsOpen(true)}>Create new template</button>
  //     <dialog className={style["modal"]} ref={ref} onCancel={() => setIsOpen(false)}>
  //       <svg width={containerSize.width} height={containerSize.height} style={{ backgroundColor: "lightblue" }}>
  //         <foreignObject x={containerSize.width / 2 - 20} y={50} width="160" height="160">
  //           <input ref={inputRef} type="text" onChange={handleInputChange} />
  //           <div>{iconLeft}</div>
  //           <div>{iconRight}</div>
  //         </foreignObject>
  //       </svg>
  //       <button
  //         onClick={() => {
  //           setIsOpen(false);
  //           setTitle(inputRef.current?.value ?? "");
  //         }}
  //       >
  //         Submit
  //       </button>
  //       {/* Button to submit the modal */}
  //       <button onClick={() => setIsOpen(false)}>Cancel</button> {/* Button to close the modal */}
  //     </dialog>
  //   </>
  // );
  const [nodes, setNodes] = useState<Node[]>([{ x: 200, y: 50 }]);

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
          <circle cx={node.x} cy={node.y} r={20} fill="white" stroke="black" />
          <text x={node.x - 5} y={node.y + 5} fontSize="12">
            {index + 1}
          </text>
          <g transform={`translate(${node.x - 25}, ${node.y + 17})`}>
            <FaArrowDown
              className={cx("icon", "left")}
              style={{ cursor: "copy" }}
              onClick={() => addNode(node, "left")}
            />
          </g>
          <g transform={`translate(${node.x + 10}, ${node.y + 17})`}>
            <FaArrowDown
              className={cx("icon", "right")}
              style={{ cursor: "copy" }}
              onClick={() => addNode(node, "right")}
            />
          </g>
        </React.Fragment>
      ))}
    </svg>
  );
};
export default InitialTemplate;
