import { useState } from "react";
import {
  generateDeleteSolution,
  generateInsertSolution,
  compareTreeSolutions,
} from "../utils/AVLTreeService/excerciseUtils";
import { TreeStep } from "../utils/AVLTreeService/types";
import { TreeNode } from "../utils/treeUtils";
import { useTreeTemplates } from "./useTreeTemplates";

// Define exercise mode and operation types
type OperationType = "INSERT" | "DELETE";

export function useTreeOperations(initialTreeData: TreeNode, resetTemplates: () => void) {
  const [currentOperationType, setCurrentOperationType] = useState<OperationType>("INSERT");
  const [targetValue, setTargetValue] = useState<number | null>(null);
  const [showingSolution, setShowingSolution] = useState(false);
  const [solution, setSolution] = useState<TreeStep[]>([]);
  const [solutionSteps, setSolutionSteps] = useState<TreeStep[]>([]);

  const getTreeValues = (node: TreeNode | null, values: number[] = []): number[] => {
    if (!node) return values;
    values.push(node.value);
    getTreeValues(node.children[0], values);
    getTreeValues(node.children[1], values);
    return values;
  };
  const values = getTreeValues(initialTreeData);

  const generateInsertExercise = (input?: number) => {
    const validInput = input && input > 0 && input < 100 && !values.includes(input);
    let newValue = validInput ? input : Math.floor(Math.random() * 99) + 1;
    while (values.includes(newValue)) {
      newValue = Math.floor(Math.random() * 99) + 1;
    }
    setTargetValue(newValue);
    setCurrentOperationType("INSERT");
    setShowingSolution(false);
    setSolutionSteps([]);
  };

  const generateDeleteExercise = (input?: number) => {
    // helper to get all node values from the tree

    const validInput = input && values.includes(input);
    if (values.length > 0) {
      const value = validInput ? input : values[Math.floor(Math.random() * values.length)];
      setTargetValue(value);
      setCurrentOperationType("DELETE");
      setShowingSolution(false);
      setSolutionSteps([]);
    }
  };

  const generateRandomTree = () => {
    resetTemplates();
    setShowingSolution(false);
    setSolutionSteps([]);
    setTargetValue(null);
  };

  const showSolution = (treeData: TreeNode) => {
    if (targetValue === null) return;
    let updatedSteps = [];
    if (currentOperationType === "INSERT") {
      updatedSteps = generateInsertSolution(treeData, targetValue);
    } else {
      updatedSteps = generateDeleteSolution(treeData, targetValue);
    }
    console.log(updatedSteps);
    // Create a simplified solution array (you can adjust as needed)
    const sol: TreeStep[] = [];
    sol[0] = { operation: "Initial Data", tree: treeData, successorDelete: false };
    const extendedDelete = updatedSteps[0]?.successorDelete;
    sol[1] = extendedDelete === true ? updatedSteps[1] : updatedSteps[0];
    if (updatedSteps.length >= 2) {
      sol[2] = updatedSteps[updatedSteps.length - 1];
    }
    // compare solution
    setSolution(sol);
    setSolutionSteps(updatedSteps);
    setShowingSolution(true);
  };

  const showAllSteps = (treeData: TreeNode) => {
    if (targetValue === null) return;
    let updatedSteps = [];
    if (currentOperationType === "INSERT") {
      updatedSteps = generateInsertSolution(treeData, targetValue);
    } else {
      updatedSteps = generateDeleteSolution(treeData, targetValue);
    }
    // Create a simplified solution array (you can adjust as needed)
    const sol: TreeStep[] = [];
    sol[0] = { operation: "Initial Data", tree: treeData, successorDelete: false };
    // const extendedDelete = updatedSteps[0]?.successorDelete;
    // sol[1] = extendedDelete === true ? updatedSteps[1] : updatedSteps[0];
    // if (updatedSteps.length > 2) {
    //   sol[2] = updatedSteps[updatedSteps.length - 1];
    // }
    for (let i = 0; i < updatedSteps.length; i++) {
      sol[i] = updatedSteps[i];
    }
    setSolution(sol);
    setSolutionSteps(updatedSteps);
    setShowingSolution(true);
  };

  const hideSolution = () => {
    setShowingSolution(false);
  };

  return {
    currentOperationType,
    targetValue,
    showingSolution,
    solution,
    solutionSteps,
    generateInsertExercise,
    generateDeleteExercise,
    generateRandomTree,
    showSolution,
    hideSolution,
    showAllSteps,
  };
}

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
