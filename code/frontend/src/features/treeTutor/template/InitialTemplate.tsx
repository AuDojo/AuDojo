import React, { useState, useEffect, useRef } from "react";
import { FaArrowDown } from "react-icons/fa";
import style from "./InitialTemplate.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const iconLeft = <FaArrowDown className={cx("icon", "left")} />;
const iconRight = <FaArrowDown className={cx("icon", "right")} />;
interface Node {
  id: number;
  x: number;
  y: number;
  value: number;
  treeHeight: number;
  hasChildLeft?: boolean;
  hasChildRight?: boolean;
}

const TEST_VALUE = 10;

const InitialTemplate = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [nodes, setNodes] = useState<Node[]>([{ id: 0, x: 225, y: 50, treeHeight: 0, value: TEST_VALUE }]);
  const maxTreeHeight = Math.max(...nodes.map((item) => item.treeHeight));
  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);
  const addNode = (parent: Node, direction: "left" | "right") => {
    const offsetX = direction === "left" ? -50 : 50;
    const offsetY = 70;

    if (direction === "left") {
      parent.hasChildLeft = true;
    } else {
      parent.hasChildRight = true;
    }

    const newNode = {
      id: direction === "left" ? parent.id * 2 + 1 : parent.id * 2 + 2,
      x: parent.x + offsetX,
      y: parent.y + offsetY,
      treeHeight: parent.treeHeight + 1,
      value: TEST_VALUE,
    };
    setNodes((prev) => [...prev, newNode]);
  };

  return (
    <>
      <h1 style={{ position: "fixed", top: "100px", left: "10px" }}>Title: {title}</h1>
      <button onClick={() => setIsOpen(true)}>Create new template</button>
      <dialog className={style["modal"]} ref={ref} onCancel={() => setIsOpen(false)}>
        <div className={style["modal-content"]}>
          <h3>Create a new template</h3>
          <svg className={style["custom-svg"]} viewBox={`0 0 500 ${maxTreeHeight * 70 + 200}`}>
            {nodes.map((node, index) => (
              <React.Fragment key={index}>
                <foreignObject x={node.x} y={node.y} width="50px" height="50px">
                  {/* <div className={style["node"]}> */}
                  <input value={TEST_VALUE} ref={inputRef} type="number" />
                  {/* </div> */}
                </foreignObject>

                {/*left arrow*/}
                {!node.hasChildLeft && (
                  <g
                    transform={`translate(${node.x - 7}, ${node.y + 30})`}
                    cursor={"copy"}
                    onClick={() => addNode(node, "left")}
                  >
                    <path
                      d="M18.36 5.64a9 9 0 1 0 0 12.72 9 9 0 0 0 0-12.72Zm-5.42 9.42-3.73.69a.81.81 0 0 1-1-1l.7-3.73a1 1 0 0 1 1.55-.57l3 3a1 1 0 0 1-.52 1.61Z"
                      style={{
                        fill: "#2ca9bc",
                        strokeWidth: 2,
                      }}
                    />
                    <path
                      d="M15.54 8.46 12 12m-2.79 3.75 3.73-.69a1 1 0 0 0 .57-1.55l-3-3a1 1 0 0 0-1.55.57l-.69 3.73a.8.8 0 0 0 .94.94Zm9.15 2.61a9 9 0 1 0-12.72 0 9 9 0 0 0 12.72 0Z"
                      style={{
                        fill: "none",
                        stroke: "#000",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    />
                  </g>
                )}
                {/*right arrow*/}
                {!node.hasChildRight && (
                  <g
                    transform={`translate(${node.x + 30}, ${node.y + 30})`}
                    cursor={"copy"}
                    onClick={() => addNode(node, "right")}
                  >
                    <path
                      d="M18.36 5.64a9 9 0 1 0 0 12.72 9 9 0 0 0 0-12.72Zm-3.57 10.12-3.73-.7a1 1 0 0 1-.57-1.55l3-3a1 1 0 0 1 1.55.57l.7 3.73a.82.82 0 0 1-.95.95Z"
                      style={{
                        fill: "#2ca9bc",
                        strokeWidth: 2,
                      }}
                    />
                    <path
                      d="M8.46 8.46 12 12m3.75 2.79-.69-3.73a1 1 0 0 0-1.55-.57l-3 3a1 1 0 0 0 .57 1.55l3.73.69a.8.8 0 0 0 .94-.94Zm2.61-9.15a9 9 0 1 0 0 12.72 9 9 0 0 0 0-12.72Z"
                      style={{
                        fill: "none",
                        stroke: "#000",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    />
                  </g>
                )}
              </React.Fragment>
            ))}
          </svg>
          <div className={cx("buttons")}>
            <button
              onClick={() => {
                setIsOpen(false);
                setTitle(inputRef.current?.value ?? "");
              }}
            >
              Submit
            </button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </div>
      </dialog>

      {nodes.map((node, index) => (
        <p key={index}>
          Node: id={node.id} value={node.value}
        </p>
      ))}
    </>
  );
};
export default InitialTemplate;
