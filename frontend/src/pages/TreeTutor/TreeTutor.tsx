import { TreeTemplate } from "@/features/treeTutor/treeTemplate";
import styles from "./TreeTutor.module.css";
import { useState } from "react";
import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { generateRandomAVL } from "./utils/AVLTreeService";
//import { ExerciseManager } from "./utils/ExerciseManager";

/*
type ExerciseMode = "CUSTOM" | "RANDOM";
type OperationType = "INSERT" | "DELETE";
*/

const TreeTutor = () => {
  const [templates, setTemplates] = useState<number[]>([]);

  // treeData of initial Template
  const root: TreeNode = {
    value: 0,
    height: 0,
    id: crypto.randomUUID(),
    position: "root",
    children: [null, null],
    depth: 0,
    balanceFactor: 0,
  };

  const sample: TreeNode = generateRandomAVL() ?? root;
  const [initialTreeData, setInitialTreeData] = useState<TreeNode>(sample);

  // treeData of consecutive Tree Templates
  const [templateTree, setTemplateTree] = useState<Record<number, TreeNode>>({});

  /*
  const [exerciseMode, setExerciseMode] = useState<ExerciseMode>("RANDOM");
  const [currentOperationType, setCurrentOperationType] = useState<OperationType>("INSERT");
  const [targetValue, setTargetValue] = useState<number | null>(null);
  const [solutionTree, setSolutionTree] = useState<TreeNode | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  */

  const addTemplate = () => {
    if (templates.length < 3) {
      const newId = Date.now();
      setTemplates([...templates, newId]);

      setTemplateTree({
        ...templateTree,
        [newId]: root,
      });
    }
  };

  const removeTemplate = (id: number) => {
    setTemplates(templates.filter((templateId) => templateId !== id));

    const { [id]: _, ...restOfTemplates } = templateTree;
    setTemplateTree(restOfTemplates);
  };

  const updateTemplateTree = (id: number, newTree: TreeNode) => {
    setTemplateTree({
      ...templateTree,
      [id]: newTree,
    });
  };

  const updateInitialTree = (newTree: TreeNode) => {
    setInitialTreeData(newTree);
    console.log("from initial treedata", initialTreeData);
  };

  /*
  useEffect(() => {

    console.log("Updated initialTreeData:", initialTreeData);
  }, [initialTreeData]);
  */

  return (
    <>
      <main className={styles.mainContent}>
        <h2 className={styles.insertHeader}>Insert X</h2>
        <section className={styles.treeContainer}>
          <div className={styles.treeWrapper}>
            <div className={styles.treeTemplate}>
              <TreeTemplate treeData={initialTreeData} onTreeUpdate={updateInitialTree} />
            </div>
            {templates.map((id) => (
              <div key={id} className={styles.treeTemplate}>
                <button className={styles.closeButton} onClick={() => removeTemplate(id)}>
                  ✖
                </button>
                <TreeTemplate treeData={templateTree[id]} onTreeUpdate={(newTree) => updateTemplateTree(id, newTree)} />
              </div>
            ))}
            {templates.length < 3 && (
              <button className={styles.addTemplate} onClick={addTemplate}>
                +
              </button>
            )}
          </div>
        </section>
        <div className={styles.controls}>
          <button className={styles.practiceInsertButton}>Practice Insert</button>
          <button className={styles.practiceDeleteButton}>Practice Delete</button>
          <button className={styles.randomModeButton}>Random Mode</button>
          <button className={styles.submit}>Submit</button>
        </div>
      </main>
    </>
  );
};

export default TreeTutor;
