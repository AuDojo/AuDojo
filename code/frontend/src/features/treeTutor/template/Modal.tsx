import { useEffect, useRef } from "react";
import style from "./Modal.module.css";

interface ModalProps {
  openModal: boolean;
  submit?: () => void;
  cancel: () => void;
  children: React.ReactNode;
}

const Modal = ({ openModal, submit, cancel, children }: ModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal(); // Show the modal if openModal is true
    } else {
      ref.current?.close(); // Close the modal if openModal is false
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={cancel} className={style["modal"]}>
      {/* onCancel: close the modal with ESC */}
      {children}
      <button onClick={submit}>Submit</button> {/* Button to submit the modal */}
      <button onClick={cancel}>Cancel</button> {/* Button to close the modal */}
    </dialog>
  );
};

export default Modal;
