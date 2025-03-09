import { TreeVisualizer } from "@/features/tutorial/components/treeVisualizer";
import { Tree, TreeSteps } from "@/features/tutorial/types";
import styles from "./TreeTutorial.module.css";

const t1: Tree = {
  value: 1,
  children: [{ value: 2, children: [null, null], color: "white", position: "left" }, null],
  color: "white",
  position: "root",
};

const t2: Tree = {
  value: 1,
  children: [null, { value: 3, children: [null, null], color: "white", position: "right" }],
  color: "white",
  position: "root",
};

const data: TreeSteps = {
  steps: [
    {
      description: "blah blah",
      tree: t1,
    },
    {
      description: "blah blah2",
      tree: t2,
    },
  ],
};

const TreeTutorial = () => {
  return (
    <div className={styles.allContainer}>
      <div className={styles.naviContainer}>
        <a href="www.youtube.com">hi</a>
        <a href="www.youtube.com">hi2</a>
      </div>
      <TreeVisualizer data={data} title="moin" />
    </div>
  );
};

export default TreeTutorial;
