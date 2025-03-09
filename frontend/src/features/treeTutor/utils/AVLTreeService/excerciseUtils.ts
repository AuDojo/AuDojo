import { TreeNode } from "../treeUtils";
import { deleteAVLTracker, insertAVLTracker } from "./changingTree/insertAndDelete";
import { getBalanceFactor } from "./getters";
import { BalanceIndicator, TreeStep } from "./types";
import { updateAllHeightsRecursive } from "./updateTreeAttributes";

/**
 * Create a random AVL Tree with 3 - 12 nodes with values between 1 and 99
 * Tree is constructed by using consecutive insertAVL calls
 * @returns root node of randomly generated AVL Tree
 */
export function generateAVL(random: boolean, input: readonly number[] | null): TreeNode | null {
  let root: TreeNode | null = null;
  const values = new Set<number>();

  if (random) {
    const nodeCount = Math.floor(Math.random() * 10) + 3;

    while (values.size < nodeCount) {
      const value = Math.floor(Math.random() * 99) + 1;
      values.add(value);
    }
  } else {
    if (!input) {
      return root;
    }
    for (const num of input) {
      values.add(num);
    }
  }
  for (const value of values) {
    root = insertAVLTracker(root, value, null);
    // printTree(root);
  }
  updateAllHeightsRecursive(root);

  return root;
}
// Validate if tree is a valid AVL tree

export function isValidAVL(node: TreeNode | null): boolean {
  if (!node) return true;

  // Check balance factor
  const balance = getBalanceFactor(node);
  if (balance < -1 || balance > 1) {
    console.error(`Invalid balance factor ${balance} at node ${node.value}`);
    return false;
  }

  // Check BST property
  if (node.children[0] && node.children[0].value >= node.value) {
    console.error(`BST property violated: left child ${node.children[0].value} >= parent ${node.value}`);
    return false;
  }

  if (node.children[1] && node.children[1].value <= node.value) {
    console.error(`BST property violated: right child ${node.children[1].value} <= parent ${node.value}`);
    return false;
  }

  // Recursively check children
  return isValidAVL(node.children[0]) && isValidAVL(node.children[1]);
}
// Generate tree after insertion for solution

export function generateInsertSolution(root: TreeNode, value: number): TreeStep[] {
  const steps: TreeStep[] = [];
  const clonedRoot = structuredClone(root);
  insertAVLTracker(clonedRoot, value, steps);
  return steps;
}
export function generateDeleteSolution(root: TreeNode, value: number): TreeStep[] {
  const steps: TreeStep[] = [];
  const clonedRoot = structuredClone(root);

  console.log("==== Starting Deletion Practive for value", value, "====");
  deleteAVLTracker(clonedRoot, value, steps);
  /*
  console.log(`===== PRINTING ${steps.length} SOLUTION STEPS =====`);
  steps.forEach((step, index) => {
    console.log(`Step ${index + 1}: ${step.operation}`);
    if (step.tree) {
      console.log(`Tree structure at step ${index + 1}:`);
      printTree(step.tree);
    } else {
      console.log(`No tree data available for step ${index + 1}`);
    }
    console.log("-----------------------------------");
  });
  */
  console.log("==== Ending Deletion Practive for value", value, "====");
  return steps;
}

export function addSteps(steps: TreeStep[] | null, subTree: BalanceIndicator, rootRef: { current: TreeNode | null }) {
  if (steps) {
    console.log("==== Hello from steps ====");
    switch (subTree.operation) {
      case "LL":
        steps.push({
          tree: structuredClone(rootRef.current),
          operation: "LL Case: Performed right rotation",
          successorDelete: false,
        });
        break;
      case "LR":
        steps.push({
          tree: subTree.copy,
          operation: "LR Case: Performed first left rotation",
          successorDelete: false,
        });
        steps.push({
          tree: structuredClone(rootRef.current),
          operation: "LR Case: Performed second right rotation",
          successorDelete: false,
        });
        break;
      case "RR":
        steps.push({
          tree: structuredClone(rootRef.current),
          operation: "RR Case: Performed left rotation",
          successorDelete: false,
        });
        break;
      case "RL":
        steps.push({
          tree: subTree.copy,
          operation: "RL Case: Performed first right rotation",
          successorDelete: false,
        });
        steps.push({
          tree: structuredClone(rootRef.current),
          operation: "RL Case: Performed second left rotation",
          successorDelete: false,
        });
        break;
      default:
        console.log("default triggered");
    }
  }
}
