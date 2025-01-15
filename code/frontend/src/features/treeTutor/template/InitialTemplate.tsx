import { useState, useEffect, useRef } from "react";
import { FaArrowDown } from "react-icons/fa";
import style from "./InitialTemplate.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const iconLeft = <FaArrowDown className={cx("icon", "left")} />;
const iconRight = <FaArrowDown className={cx("icon", "right")} />;

const InitialTemplate = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      <h1 style={{ position: "fixed", top: "100px", left: "10px" }}>Title: {title}</h1>
      <button onClick={() => setIsOpen(true)}>Create new template</button>
      <dialog className={style["modal"]} ref={ref} onCancel={() => setIsOpen(false)}>
        <div className={style["modal-content"]}>
          <h3>Create a new template</h3>
          <svg className={style["custom-svg"]} viewBox="0 0 500 900">
            <g>
              <foreignObject x={250 - 50 / 2} y={50} width="50px" height="50px">
                <div className={style["node"]}>
                  <input ref={inputRef} type="number" />
                </div>
              </foreignObject>
              <div>{iconRight}</div>
              <div>{iconLeft}</div>
            </g>
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
    </>
  );
};
export default InitialTemplate;
