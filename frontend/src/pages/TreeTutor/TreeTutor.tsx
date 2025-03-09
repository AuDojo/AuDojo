import { localStorageKeys } from "@/config/localStorage";
import { ArrowButton } from "@/features/treeTutor/arrowButton";
import { CloseButton } from "@/features/treeTutor/closeButton";
import { DEFAULT_TREE, MAX_TEMPLATES } from "@/features/treeTutor/constants";
import { TreeTemplate } from "@/features/treeTutor/treeTemplate";
import {
  generateAVL,
  generateDeleteSolution,
  generateInsertSolution,
} from "@/features/treeTutor/utils/AVLTreeService/excerciseUtils";
import { TreeStep } from "@/features/treeTutor/utils/AVLTreeService/types";
import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import styles from "./TreeTutor.module.css";
import { getRandomValue, resetArrays } from "@/features/treeTutor/utils/AVLTreeService/difficulty/difficultyTools";

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
  const [currentTemplate, setCurrentTemplate] = useState<number>(0); // The current (right) template shown
  const [targetValue, setTargetValue] = useState<number | null>(null);
  const [showingSolution, setShowingSolution] = useState(false);
  const [solution, setSolution] = useState<TreeStep[]>([]);
  const [solutionSteps, setSolutionSteps] = useState<TreeStep[]>([]);
  const [initialTreeData, setInitialTreeData] = useLocalStorage<TreeNode>(
    localStorageKeys.initialTreeData,
    generateAVL(false, DEFAULT_TREE) ?? defaultRoot
  );
  const [templateTree, setTemplateTree] = useState<Record<number, TreeNode>>({ [initialID]: initialTreeData });
  // treeData of consecutive Tree Templates
  console.log(solutionSteps);
  const addTemplate = () => {
    if (templates.length <= MAX_TEMPLATES) {
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
  };

  // Create an insert exercise
  const generateInsertExercise = () => {
    // Generate a random value to insert between 1-99
    const newValue = getRandomValue(initialTreeData, 0, "insertion"); // TODO: Testen und difficulty_level zu Variable ändern // Math.floor(Math.random() * 99) + 1;
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
      const value = getRandomValue(initialTreeData, 0, "deletion"); // TODO: Testen und difficulty_level zu Variable ändern // values[Math.floor(Math.random() * values.length)];
      setTargetValue(value);
      setCurrentOperationType("DELETE");
      setShowingSolution(false);
      setSolutionSteps([]);
    }
  };

  // Generate new random tree
  const generateNewTree = () => {
    const newSample = generateAVL(true, null);
    const newID = Date.now();
    resetArrays();
    setInitialTreeData(newSample ?? defaultRoot);
    setTemplates([newID]);
    setTemplateTree({ [newID]: newSample ?? defaultRoot });
    setCurrentTemplate(0);
    setShowingSolution(false);
    setSolutionSteps([]);
    setTargetValue(null);
  };

  // Show solution
  const showSolution = () => {
    if (targetValue === null) return;
    let updatedSteps = [];

    if (currentOperationType === "INSERT") {
      //setTargetValue(getRandomValue(initialTreeData, 0, "insertion")); // TODO: Testing and changing difficulty_value to variable
      updatedSteps = generateInsertSolution(initialTreeData, targetValue);
    } else {
      //setTargetValue(getRandomValue(initialTreeData, 0, "deletion")); // TODO: Testing and changing difficulty_value to variable
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

  const hideSolution = () => {
    setShowingSolution(false);
  };

  return (
    <>
      <main className={styles.mainContent}>
        <h2 className={styles.insertHeader}>
          {currentOperationType === "INSERT" ? `Insert ${targetValue ?? "X"}` : `Delete ${targetValue ?? "X"}`}
        </h2>
        <span>currentTemplate: {currentTemplate}</span>
        <span>template.length: {templates.length}</span>
        <section className={styles.treeContainer}>
          {!showingSolution ? (
            // User workspace view with templates
            <div className={styles.treeWrapper}>
              <ArrowButton
                direction="left"
                disabled={templates.length === 1 ? currentTemplate === 0 : currentTemplate <= 1}
                onClick={() => {
                  setCurrentTemplate((prev) => prev - 1);
                }}
              />
              {templates.length >= 2 && (
                // First Tree Template
                <div className={styles.treeTemplate}>
                  {currentTemplate > 1 && (
                    <CloseButton
                      onClick={() => {
                        if (currentTemplate >= templates.length - 1) {
                          setCurrentTemplate((prev) => prev - 1);
                        }
                        removeTemplate(templates[currentTemplate - 1]);
                      }}
                    />
                  )}
                  <TreeTemplate
                    treeData={templateTree[templates[currentTemplate - 1]]}
                    onTreeUpdate={(newTree) => {
                      if (currentTemplate === 0) {
                        updateInitialTree(newTree);
                      } else {
                        updateTemplateTree(templates[currentTemplate - 1], newTree);
                      }
                    }}
                  />
                </div>
              )}
              <div className={styles.treeTemplate}>
                {currentTemplate > 0 && (
                  <CloseButton
                    onClick={() => {
                      if (currentTemplate >= templates.length - 1) {
                        setCurrentTemplate((prev) => prev - 1);
                      }
                      removeTemplate(templates[currentTemplate]);
                    }}
                  />
                )}
                {/* Second Tree Template */}
                <TreeTemplate
                  treeData={templateTree[templates[currentTemplate]]}
                  onTreeUpdate={(newTree) => {
                    if (currentTemplate === 0) {
                      updateInitialTree(newTree);
                    } else {
                      updateTemplateTree(templates[currentTemplate], newTree);
                    }
                  }}
                />
              </div>
              <ArrowButton
                direction="right"
                disabled={currentTemplate >= MAX_TEMPLATES}
                onClick={() => {
                  if (currentTemplate === templates.length - 1) {
                    addTemplate();
                  }
                  setCurrentTemplate((prev) => prev + 1);
                }}
              />
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
