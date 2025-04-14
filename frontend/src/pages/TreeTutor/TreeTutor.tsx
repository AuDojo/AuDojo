import { HOTKEYS } from "@/config/hotkeyMap";
import { localStorageKeys } from "@/config/localStorage";
import { ArrowButton } from "@/features/treeTutor/arrowButton";
import { CloseButton } from "@/features/treeTutor/closeButton";
import { DEFAULT_TREE, defaultRoot, difficultyObj, MAX_TEMPLATES } from "@/features/treeTutor/constants";
import { useTreeOperations } from "@/features/treeTutor/hooks/useTreeOperations";
import { useTreeTemplates } from "@/features/treeTutor/hooks/useTreeTemplates";
import { TemplateIndex } from "@/features/treeTutor/pageIndex";
import { TreeTemplate } from "@/features/treeTutor/treeTemplate";
import { generateAVL } from "@/features/treeTutor/utils/AVLTreeService/excerciseUtils";
import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { mergeRefs } from "@/utils/refUtils";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";
import { useDebounceCallback, useLocalStorage } from "usehooks-ts";
import styles from "./TreeTutor.module.css";

export interface FormInput {
  insertInput: string;
}
const TreeTutor = () => {
  const [initialTreeData, setInitialTreeData] = useLocalStorage<TreeNode>(
    localStorageKeys.initialTreeData,
    generateAVL(false, DEFAULT_TREE) ?? defaultRoot
  );
  const deleteValueRef = useRef<HTMLSelectElement>(null);
  const { t } = useTranslation("treetutor");

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
    // difficultyRef,
    generateInsertExercise,
    generateDeleteExercise,
    generateRandomTree,
    showSolution,
    hideSolution,
    getTreeValues,
    showAllSteps,
  } = useTreeOperations(initialTreeData, resetTemplates);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormInput>({ mode: "onChange" });

  const goPrevTemplate = () => {
    setCurrentTemplate((prev) => Math.max(prev - 1, 1));
  };
  const goNextTemplate = () => {
    if (currentTemplate === templates.length - 1) {
      addTemplate();
    }
    setCurrentTemplate((prev) => Math.min(prev + 1, MAX_TEMPLATES - 1));
  };

  const handlePracticeInsert = (data?: FormInput) => {
    generateInsertExercise(Number(data?.insertInput));
  };

  const handlePracticeDelete = () => {
    generateDeleteExercise(Number(deleteValueRef.current?.value));
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
    if (getTreeValues(initialTreeData).includes(Number(event.target.value))) {
      setError("insertInput", { message: t("insert-error") + "‼️" });
      return;
    }
    setValue("insertInput", event.target.value);
  };

  // const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const userDifficulty = Number(event.target.value);
  //   console.log("userDiff", userDifficulty);

  //   setRefValue(difficultyRef, userDifficulty);
  // };

  const onSubmit = useDebounceCallback((data: FormInput) => {
    console.log("data: ", data);
    handlePracticeInsert(data);
  }, 100);
  const debouncedHandleSubmit = useDebounceCallback(handleSubmit, 100);

  // Hotkeys
  useHotkeys(HOTKEYS.treeTutor.prevTemplate, goPrevTemplate, { preventDefault: true });
  useHotkeys(HOTKEYS.treeTutor.nextTemplate, goNextTemplate, { preventDefault: true });

  useHotkeys(
    HOTKEYS.treeTutor.InsertRandom,
    useDebounceCallback(() => {
      handlePracticeInsert();
      setValue("insertInput", "");
    }, 100),
    { preventDefault: true }
  );
  useHotkeys(
    HOTKEYS.treeTutor.DeleteRandom,
    useDebounceCallback(() => {
      generateDeleteExercise();
    }, 100),
    { preventDefault: true }
  );

  useHotkeys(
    HOTKEYS.treeTutor.RandomTree,
    useDebounceCallback(() => {
      generateRandomTree();
    }, 100),
    {
      preventDefault: true,
    }
  );
  useHotkeys(HOTKEYS.treeTutor.ShowSolution, () => targetValue && !showingSolution && showSolution(initialTreeData));

  useHotkeys(HOTKEYS.treeTutor.HideSolution, () => showingSolution && hideSolution(), { preventDefault: true });

  useHotkeys(HOTKEYS.treeTutor.ShowSteps, () => showingSolution && showAllSteps(initialTreeData), {
    preventDefault: true,
  });

  const deleteRef = useHotkeys(HOTKEYS.treeTutor.submit, handlePracticeDelete, {
    preventDefault: true,
    enableOnFormTags: ["select"],
  });

  return (
    <>
      <div className={styles.mainContent}>
        <h2 className={styles.insertHeader}>
          {/* {currentOperationType === "INSERT" ? `Insert ${targetValue ?? "X"}` : `Delete ${targetValue ?? "X"}`} */}
          {targetValue
            ? currentOperationType === "INSERT"
              ? `Insert ${targetValue ?? "X"}`
              : `Delete ${targetValue ?? "X"}`
            : t("header-info")}
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
                  <TemplateIndex currentTemplate={currentTemplate} totalTemplates={templates.length} />
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
                <TemplateIndex currentTemplate={currentTemplate + 1} totalTemplates={templates.length} />
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
                    <>
                      <TreeTemplate
                        treeData={step.tree}
                        onTreeUpdate={setInitialTreeData} // Read-only view for solution steps
                      />
                      <TemplateIndex currentTemplate={index + 1} totalTemplates={solution.length} />{" "}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <div className={styles.controls}>
          <label htmlFor="difficulty-select" className={styles.labelDifficulty}>
            {t("difficulty")}
          </label>
          <select
            name="difficulty"
            id="difficulty-select"
            className={styles.selectDifficulty}
            // onChange={handleDifficultyChange}
            defaultValue={difficultyObj.random}
          >
            <option value={difficultyObj.random}>{t("random")}</option>
            <option value={difficultyObj.easy}>1. {t("easy")}</option>
            <option value={difficultyObj.medium}>2. {t("medium")}</option>
            <option value={difficultyObj.hard}>3. {t("hard")}</option>
          </select>

          <form onSubmit={debouncedHandleSubmit(onSubmit)} className={styles.insertForm}>
            {errors.insertInput && (
              <div className={styles.insertErrorMsg} role="alert">
                {errors.insertInput.message}
              </div>
            )}
            <button
              type="submit"
              className={styles.practiceInsertButton}
              aria-label="Insert (random) [I]"
              data-tooltip="top 1000"
            >
              Insert
            </button>

            <input
              className={styles.insertInput}
              type="text"
              {...register("insertInput", { onChange: handleInputChange })}
              maxLength={2}
              placeholder={t("random")}
            />
          </form>

          <div className={styles.deleteControls}>
            <button
              type="button"
              className={styles.practiceDeleteButton}
              onClick={handlePracticeDelete}
              aria-label="Delete (random) [D]"
              data-tooltip="top 1000"
            >
              Delete
            </button>
            <select
              ref={mergeRefs(deleteRef, deleteValueRef)}
              name="delete"
              id="delete-node"
              className={styles.selectDelete}
              onChange={handlePracticeDelete}
            >
              <option value="delete-random">{t("random")}</option>
              {getTreeValues(initialTreeData).map(
                (value) =>
                  value !== 0 && (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  )
              )}
            </select>
          </div>

          <button
            type="button"
            className={styles.randomModeButton}
            aria-label="Random Tree [R]"
            data-tooltip="top 1000"
            onClick={generateRandomTree}
          >
            {t("button.random-tree")}
          </button>

          <button
            type="button"
            aria-label={showingSolution ? "Hide Solution [H]" : "Show Solution [S]"}
            data-tooltip="top 1000"
            disabled={targetValue === null}
            className={styles.submit}
            onClick={showingSolution ? hideSolution : () => showSolution(initialTreeData)}
          >
            {showingSolution ? t("button.hide-solution") : t("button.show-solution")}
          </button>
          {showingSolution && (
            <button
              type="button"
              className={styles.submit}
              aria-label="Show All Steps [A]"
              data-tooltip="top 1000"
              onClick={() => showAllSteps(initialTreeData)}
            >
              {t("button.show-all-steps")}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TreeTutor;
