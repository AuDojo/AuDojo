import { useEffect, useRef } from "react";

interface TeamModalProps {
  isOpen: boolean;
}

const TeamModal = ({ isOpen }: TeamModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef}>
      <p>Team</p>
    </dialog>
  );
};

export default TeamModal;
