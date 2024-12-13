import React, { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
}

const WrapWithDialog = ({ children }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  return <dialog ref={dialogRef}>{children}</dialog>;
};

export default WrapWithDialog;
