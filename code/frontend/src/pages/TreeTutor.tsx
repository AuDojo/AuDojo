import { useSetTitle } from "@/hooks";
import { InitialTemplate } from "@/features/treeTutor";
// import { BinaryTreeTemplate } from "@features/treeTutor";
const TreeTutor = () => {
  useSetTitle("TreeTutor");
  return (
    <>
      <h1>TreeTutor</h1>
      {/* <BinaryTreeTemplate /> */}
      <InitialTemplate />
    </>
  );
};

export default TreeTutor;
