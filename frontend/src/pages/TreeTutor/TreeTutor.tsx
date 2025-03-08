import { TreeTemplate } from "@/features/treeTutor/treeTemplate";
import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { useState } from "react";
import styles from "./TreeTutor.module.css";
import { generateDeleteSolution, generateInsertSolution, generateAVL, TreeStep } from "./utils/AVLTreeService";

const defaultRoot: TreeNode = {
  value: 0,
  height: 0,
  id: crypto.randomUUID(),
  position: "root",
  children: [null, null],
  depth: 0,
  balanceFactor: 0,
};
// Define exercise mode and operation types
type OperationType = "INSERT" | "DELETE";
const initialID = Date.now();

const TreeTutor = () => {
  const [templates, setTemplates] = useState<number[]>([initialID]);
  const [currentOperationType, setCurrentOperationType] = useState<OperationType>("INSERT");
  const [targetValue, setTargetValue] = useState<number | null>(null);
  const [showingSolution, setShowingSolution] = useState(false);
  const [solution, setSolution] = useState<TreeStep[]>([]);
  const [solutionSteps, setSolutionSteps] = useState<TreeStep[]>([]);
  const [treeSet, setTreeSet] = useState<boolean>(false);
  const [initialTreeData, setInitialTreeData] = useState<TreeNode>(defaultRoot);
  const [templateTree, setTemplateTree] = useState<Record<number, TreeNode>>({ [initialID]: initialTreeData });

  console.log(solutionSteps);
  console.log(templates);
  console.log(templateTree);

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
    if (!treeSet) {
      setInitialTreeData(generateAVL(true, null) ?? defaultRoot);
    }
    const newValue = Math.floor(Math.random() * 99) + 1;
    setTargetValue(newValue);
    setCurrentOperationType("INSERT");
    setShowingSolution(false);
    setSolutionSteps([]);
  };
  /*
  const generateInsertExerciseDEBUG = () => {
    const newValue = 53;
    setInitialTreeData(generateAVL(false, [55, 20, 43, 52]) ?? defaultRoot);
    setTargetValue(newValue);
    setCurrentOperationType("INSERT");
    setShowingSolution(false);
    setSolutionSteps([]);
  };
  */
  /*
  const generateDeleteExerciseDEBUG = () => {
    const newValue = 53;
    setInitialTreeData(generateAVL(false, [53, 20, 43, 26]) ?? defaultRoot);
    setTargetValue(newValue);
    setCurrentOperationType("DELETE");
    setShowingSolution(false);
    setSolutionSteps([]);
  };
  */
  // Create a delete exercise
  const generateDeleteExercise = () => {
    // Get existing values from the tree
    if (!treeSet) {
      setInitialTreeData(generateAVL(true, null) ?? defaultRoot);
      setTreeSet(true);
    }

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
    const newSample = generateAVL(true, null);
    setInitialTreeData(newSample ?? defaultRoot);
    setTemplates([]);
    setTemplateTree({});
    setShowingSolution(false);
    setSolutionSteps([]);
    setTargetValue(null);
  };

  // Show solution
  const showSolution = () => {
    if (targetValue === null) return;
    let updatedSteps = [];

    if (currentOperationType === "INSERT") {
      updatedSteps = generateInsertSolution(initialTreeData, targetValue);
    } else {
      updatedSteps = generateDeleteSolution(initialTreeData, targetValue);
    }
    const solution: TreeStep[] = [];
    const intialStep: TreeStep = { operation: "Intial Data", tree: initialTreeData, successorDelete: false };
    solution[0] = intialStep;
    const extendedDelete = updatedSteps[0].successorDelete;
    solution[1] = extendedDelete === true ? updatedSteps[1] : updatedSteps[0];
    if (updatedSteps.length > 2) {
      solution[2] = updatedSteps[updatedSteps.length - 1];
    }
    setSolution(solution);
    setSolutionSteps(updatedSteps);
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
              {templates.map((id, index) => (
                <div key={id} className={styles.treeTemplate}>
                  <button type="button" className={styles.closeButton} onClick={() => removeTemplate(id)}>
                    ✖
                  </button>
                  <TreeTemplate
                    treeData={index === 0 ? templateTree[id] : initialTreeData}
                    onTreeUpdate={index === 0 ? (newTree) => updateTemplateTree(id, newTree) : updateInitialTree}
                  />
                </div>
              ))}
              {templates.length < 3 && (
                <button type="button" className={styles.addTemplate} onClick={addTemplate}>
                  +
                </button>
              )}
            </div>
          ) : (
            // Solution view with steps displayed horizontally
            <div className={styles.treeWrapper}>
              {solution.map((step, index) => (
                <div key={index} className={styles.treeTemplate}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNumber}>Step {index + 1}</span>
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
          <button type="button" className={styles.practiceInsertButton} onClick={generateInsertExercise}>
            Practice Insert
          </button>
          <button type="button" className={styles.practiceDeleteButton} onClick={generateDeleteExercise}>
            Practice Delete
          </button>
          <button type="button" className={styles.randomModeButton} onClick={generateNewTree}>
            New Random Tree
          </button>

          {targetValue !== null && (
            <button type="button" className={styles.submit} onClick={showingSolution ? hideSolution : showSolution}>
              {showingSolution ? "Hide Solution" : "Show Solution"}
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default TreeTutor;
