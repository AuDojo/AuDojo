import { useSetTitle } from "@/hooks";
import { InitialTemplate, BinaryTemplate, Modal } from "@/features/treeTutor";
import { useState } from "react";
const TreeTutor = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useSetTitle("TreeTutor");
  return (
    <>
      <h1>TreeTutor</h1>
      <InitialTemplate />
      {/* <BinaryTemplate /> */}

      {/* <Modal openModal={isOpen} cancel={() => setIsOpen(!isOpen)}>
        <text>Hello</text>
      </Modal> */}
    </>
  );
};

export default TreeTutor;
