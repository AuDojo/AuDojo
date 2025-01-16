import { useSetTitle } from "@/hooks";
// import { BinaryTreeTemplate } from "@features/treeTutor";
import { InitialTemplate } from "@/features/treeTutor";
import TreeViz from "@/features/treeTutor/treeViz/TreeViz";
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
      <TreeViz />
    </>
  );
};

export default TreeTutor;
