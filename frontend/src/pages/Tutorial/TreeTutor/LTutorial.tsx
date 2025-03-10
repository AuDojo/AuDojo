import { TreeVisualizer } from "@/features/tutorial/components/treeVisualizer";
import { Tree, TreeSteps } from "@/features/tutorial/types";
import styles from "./TreeTutorial.module.css";
import { TutorialNavigation } from "@/features/tutorial/components";
import { TUT_TREETUTOR_DEFAULTPATH, TUT_TREETUTOR_PATHS } from "../utilConstants";

const RED = "rgb(248, 83, 152)";

const t1: Tree = {
  value: 1,
  children: [{ value: 2 }, { value: null }],
  color: RED,
};

const t3: Tree = {
  value: 1,
  children: [t1, { value: 3 }],
};

const t4: Tree = {
  value: 1,
  children: [t3, t3],
};

const t5: Tree = {
  value: 1,
  children: [
    { value: 2, children: [{ value: null }, { value: 4 }] },
    { value: 3, children: [{ value: 5 }, { value: null }] },
  ],
};

const t2: Tree = {
  value: 1,
  children: [t5, t4],
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
    {
      description: "blah blah3",
      tree: t3,
    },
    {
      description: "blah blah4",
      tree: t4,
    },
    {
      description: "blah blah5",
      tree: t5,
    },
  ],
};

const LTutorial = () => {
  return (
    <div className={styles.container}>
      <title>Left-Rotation Tutorial</title>
      <div className={styles.allContainer}>
        <TutorialNavigation defaultpath={TUT_TREETUTOR_DEFAULTPATH} navipath_map={TUT_TREETUTOR_PATHS} />
        <TreeVisualizer data={data} />
      </div>
    </div>
  );
};

export default LTutorial;
