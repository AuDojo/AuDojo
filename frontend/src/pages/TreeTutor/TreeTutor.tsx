import { HOTKEYS } from "@/config/hotkeyMap";
import { localStorageKeys } from "@/config/localStorage";
import { ArrowButton } from "@/features/treeTutor/arrowButton";
import { CloseButton } from "@/features/treeTutor/closeButton";
import { DEFAULT_TREE, defaultRoot, MAX_TEMPLATES } from "@/features/treeTutor/constants";
import { useTreeOperations } from "@/features/treeTutor/hooks/useTreeOperations";
import { useTreeTemplates } from "@/features/treeTutor/hooks/useTreeTemplates";
import { TreeTemplate } from "@/features/treeTutor/treeTemplate";
import { generateAVL } from "@/features/treeTutor/utils/AVLTreeService/excerciseUtils";
import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { mergeRefs } from "@/utils/refUtils";
import { useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useLocalStorage } from "usehooks-ts";
import styles from "./TreeTutor.module.css";
const TreeTutor = () => {
  const [initialTreeData, setInitialTreeData] = useLocalStorage<TreeNode>(
    localStorageKeys.initialTreeData,
    generateAVL(false, DEFAULT_TREE) ?? defaultRoot
  );
  const deleteValueRef = useRef<HTMLInputElement>(null);
  const insertValueRef = useRef<HTMLInputElement>(null);

  const {
    templates,
    currentTemplate,
    setCurrentTemplate,
    templateTree,
    addTemplate,
    removeTemplate,
    updateTemplateTree,
    resetTemplates,
  } = useTreeTemplates(initialTreeData, setInitialTreeData);

  const {
    currentOperationType,
    targetValue,
    showingSolution,
    solution,
    generateInsertExercise,
    generateDeleteExercise,
    generateRandomTree,
    showSolution,
    hideSolution,
    // showAllSteps,
  } = useTreeOperations(initialTreeData, resetTemplates);

  const goPrevTemplate = () => {
    setCurrentTemplate((prev) => Math.max(prev - 1, 1));
  };
  const goNextTemplate = () => {
    if (currentTemplate === templates.length - 1) {
      addTemplate();
    }
    setCurrentTemplate((prev) => Math.min(prev + 1, MAX_TEMPLATES - 1));
  };

  const handlePracticeInsert = () => {
    generateInsertExercise(Number(insertValueRef.current?.value));
  };

  const handlePracticeDelete = () => {
    generateDeleteExercise(Number(deleteValueRef.current?.value));
  };

  // Hotkeys
  useHotkeys(HOTKEYS.treeTutor.prevTemplate, goPrevTemplate);
  useHotkeys(HOTKEYS.treeTutor.nextTemplate, goNextTemplate);
  const insertRef = useHotkeys(HOTKEYS.treeTutor.submit, handlePracticeInsert, {
    preventDefault: true,
    enableOnFormTags: ["input"],
  });
  const deleteRef = useHotkeys(HOTKEYS.treeTutor.submit, handlePracticeDelete, {
    preventDefault: true,
    enableOnFormTags: ["input"],
  });

  return (
    <>
      <div className={styles.mainContent}>
        <h2 className={styles.insertHeader}>
          {currentOperationType === "INSERT" ? `Insert ${targetValue ?? "X"}` : `Delete ${targetValue ?? "X"}`}
        </h2>
        {/* <span>currentTemplate: {currentTemplate}</span>
        <span>template.length: {templates.length}</span> */}
        <section className={styles.treeContainer}>
          {!showingSolution ? (
            // User workspace view with templates
            <div className={styles.treeWrapper}>
              <ArrowButton
                direction="left"
                disabled={templates.length === 1 ? currentTemplate === 0 : currentTemplate <= 1}
                onClick={goPrevTemplate}
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
                      if (currentTemplate === 1) {
                        setInitialTreeData(newTree);
                      }
                      updateTemplateTree(templates[currentTemplate - 1], newTree);
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
                    if (currentTemplate === 0 && templates.length === 1) {
                      setInitialTreeData(newTree);
                    }
                    updateTemplateTree(templates[currentTemplate], newTree);
                  }}
                />
              </div>
              <ArrowButton direction="right" disabled={currentTemplate >= MAX_TEMPLATES - 1} onClick={goNextTemplate} />
            </div>
          ) : (
            // Solution view with steps displayed horizontally
            <div className={styles.treeWrapper}>
              {solution.map((step, index) => (
                <div key={index} className={styles.treeTemplate}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepNumber}>Step {index + 1}</span>
                  </div>
                  {step?.tree && (
                    <TreeTemplate
                      treeData={step.tree}
                      onTreeUpdate={setInitialTreeData} // Read-only view for solution steps
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <div className={styles.controls}>
          <button type="button" className={styles.practiceInsertButton} onClick={handlePracticeInsert}>
            Practice Insert
          </button>
          {/*eslint-disable-next-line react-compiler/react-compiler*/}
          <input ref={mergeRefs(insertRef, insertValueRef)} type="number" className={styles.valueInput} />

          <button type="button" className={styles.practiceDeleteButton} onClick={handlePracticeDelete}>
            Practice Delete
          </button>
          {/*eslint-disable-next-line react-compiler/react-compiler*/}
          <input ref={mergeRefs(deleteRef, deleteValueRef)} type="number" className={styles.valueInput} />

          <button type="button" className={styles.randomModeButton} onClick={generateRandomTree}>
            New Random Tree
          </button>

          <button
            type="button"
            disabled={targetValue === null}
            className={styles.submit}
            onClick={showingSolution ? hideSolution : () => showSolution(initialTreeData)}
          >
            {showingSolution ? "Hide Solution" : "Show Solution"}
          </button>
          {showingSolution && (
            <button type="button" className={styles.submit}>
              Show All Steps
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TreeTutor;
