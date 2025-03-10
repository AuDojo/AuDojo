import { TreeVisualizer } from "@/features/tutorial/components/treeVisualizer";
import { Tree, TreeSteps } from "@/features/tutorial/types";
import styles from "./TreeTutorial.module.css";
import { TutorialNavigation } from "@/features/tutorial/components";
import { TUT_TREETUTOR_DEFAULTPATH, TUT_TREETUTOR_PATHS } from "../utilConstants";

const RED = "rgb(248, 83, 152)";

const s1: Tree = {
  value: 10,
  children: [{ value: null }, { value: 20 }],
};

const s2: Tree = {
  value: 10,
  color: RED,
  children: [{ value: null }, { value: 20 }],
};

const s3: Tree = {
  value: 10,
  children: [{ value: null }, { value: 20, color: RED }],
};

const s4: Tree = {
  value: 10,
  children: [{ value: null }, { value: 20, children: [{ value: null }, { value: 30 }] }],
};

const s5: Tree = {
  value: 10,
  color: RED,
  children: [{ value: null }, { value: 20, color: RED, children: [{ value: null }, { value: 30, color: RED }] }],
};

const s6: Tree = {
  value: 20,
  children: [{ value: 10 }, { value: 30 }],
};

const data: TreeSteps = {
  steps: [
    {
      description: "insert 30",
      tree: s1,
    },
    {
      description: "10<30",
      tree: s2,
    },
    {
      description: "20<30",
      tree: s3,
    },
    {
      description: "insert 30",
      tree: s4,
    },
    {
      description: "10 has right child of depth 3 on right, 0(null) on left=>unbalanced",
      tree: s5,
    },
    {
      description: "choose the deepest path to unbalanced vertices",
      tree: s5,
    },
    {
      description: "Rotate 10,20,30 to left",
      tree: s5,
    },
    {
      description: "Rotate 15,16,17 to left",
      tree: s6,
    },
    {
      description: "Balanced!",
      tree: s6,
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
