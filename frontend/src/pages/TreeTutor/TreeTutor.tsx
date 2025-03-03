import { TreeTemplate } from "@/features/treeTutor/treeTemplate";
import styles from "./TreeTutor.module.css";
import { useState } from "react";
import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { generateRandomAVL, generateInsertSolution, generateDeleteSolution, TreeStep } from "./utils/AVLTreeService";

// Define exercise mode and operation types
type OperationType = "INSERT" | "DELETE";

const TreeTutor = () => {
  const [templates, setTemplates] = useState<number[]>([]);
  const [currentOperationType, setCurrentOperationType] = useState<OperationType>("INSERT");
  const [targetValue, setTargetValue] = useState<number | null>(null);
  const [showingSolution, setShowingSolution] = useState(false);
  const [solutionSteps, setSolutionSteps] = useState<TreeStep[]>([]);

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

  const sample = generateRandomAVL() ?? root;
  const [initialTreeData, setInitialTreeData] = useState<TreeNode>(sample);

  // treeData of consecutive Tree Templates
  const [templateTree, setTemplateTree] = useState<Record<number, TreeNode>>({});

  const addTemplate = () => {
    if (templates.length < 3) {
      const newId = Date.now();
      setTemplates([...templates, newId]);

      setTemplateTree({
        ...templateTree,
        [newId]: structuredClone(initialTreeData),
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

  // Create an insert exercise
  const generateInsertExercise = () => {
    // Generate a random value to insert between 1-99
    const newValue = Math.floor(Math.random() * 99) + 1;
    setTargetValue(newValue);
    setCurrentOperationType("INSERT");
    setShowingSolution(false);
    setSolutionSteps([]);
  };

  // Create a delete exercise
  const generateDeleteExercise = () => {
    // Get existing values from the tree
    const getTreeValues = (node: TreeNode | null, values: number[] = []): number[] => {
      if (!node) return values;
      values.push(node.value);
      getTreeValues(node.children[0], values);
      getTreeValues(node.children[1], values);
      return values;
    };

    const values = getTreeValues(initialTreeData);
    if (values.length > 0) {
      // Choose a random value from the tree
      const value = values[Math.floor(Math.random() * values.length)];
      setTargetValue(value);
      setCurrentOperationType("DELETE");
      setShowingSolution(false);
      setSolutionSteps([]);
    }
  };

  // Generate new random tree
  const generateNewTree = () => {
    const newSample = generateRandomAVL();
    setInitialTreeData(newSample ?? root);
    setTemplates([]);
    setTemplateTree({});
    setShowingSolution(false);
    setSolutionSteps([]);
    setTargetValue(null);
  };

  // Show solution
  const showSolution = () => {
    if (targetValue === null) return;

    if (currentOperationType === "INSERT") {
      const updatedSteps = generateInsertSolution(initialTreeData, targetValue);
      console.log("solution steps", solutionSteps);
      setSolutionSteps(updatedSteps);
    } else {
      const updatedSteps = generateDeleteSolution(initialTreeData, targetValue);
      setSolutionSteps(updatedSteps);
    }

    setShowingSolution(true);
  };
  // Hide solution

  const hideSolution = () => {
    setShowingSolution(false);
  };

  return (
    <>
      <main className={styles.mainContent}>
        <h2 className={styles.insertHeader}>
          {currentOperationType === "INSERT" ? `Insert ${targetValue ?? "X"}` : `Delete ${targetValue ?? "X"}`}
        </h2>

        <section className={styles.treeContainer}>
          {!showingSolution ? (
            // User workspace view with templates
            <div className={styles.treeWrapper}>
              <div className={styles.treeTemplate}>
                <TreeTemplate treeData={initialTreeData} onTreeUpdate={updateInitialTree} />
              </div>
              {templates.map((id) => (
                <div key={id} className={styles.treeTemplate}>
                  <button className={styles.closeButton} onClick={() => removeTemplate(id)}>
                    ✖
                  </button>
                  <TreeTemplate
                    treeData={templateTree[id]}
                    onTreeUpdate={(newTree) => updateTemplateTree(id, newTree)}
                  />
                </div>
              ))}
              {templates.length < 3 && (
                <button className={styles.addTemplate} onClick={addTemplate}>
                  +
                </button>
              )}
            </div>
          ) : (
            // Solution view with steps displayed horizontally
            <div className={styles.treeWrapper}>
              {solutionSteps.map((step, index) => (
                <div key={index} className={styles.treeTemplate}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNumber}>Step {index + 1}</span>
                    <span className={styles.stepDescription}>{step.operation}</span>
                  </div>
                  {step.tree && (
                    <TreeTemplate
                      treeData={step.tree}
                      onTreeUpdate={updateInitialTree} // Read-only view for solution steps
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <div className={styles.controls}>
          <button className={styles.practiceInsertButton} onClick={generateInsertExercise}>
            Practice Insert
          </button>
          <button className={styles.practiceDeleteButton} onClick={generateDeleteExercise}>
            Practice Delete
          </button>
          <button className={styles.randomModeButton} onClick={generateNewTree}>
            New Random Tree
          </button>

          {targetValue !== null && (
            <button className={styles.submit} onClick={showingSolution ? hideSolution : showSolution}>
              {showingSolution ? "Hide Solution" : "Show Solution"}
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default TreeTutor;
