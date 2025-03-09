import { TreeNode } from "../treeUtils";
import { getBalanceFactor } from "./getters";
import { BalanceIndicator, TreeStep } from "./types";
import { insertAVLTracker, deleteAVLTracker } from "./changingTree/insertAndDelete";
import { updateAllHeightsRecursive } from "./updateTreeAttributes";

/**
 * Create a random AVL Tree with 3 - 12 nodes with values between 1 and 99
 * Tree is constructed by using consecutive insertAVL calls
 * @returns root node of randomly generated AVL Tree
 */
export function generateAVL(random: boolean, input: number[] | null): TreeNode | null {
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

/**
 * Compares a submission tree against a solution tree and marks incorrect nodes
 * @param submission - The submitted tree to be evaluated
 * @param solution - The reference solution tree
 * @returns The submission tree with correct flags set appropriately
 */
export function compareTreeSolutions(submission: TreeNode | null, solution: TreeNode | null): TreeNode | null {
  // If submission node doesn't exist but solution does, return null
  if (!submission && solution) {
    return null;
  }

  // If solution node doesn't exist but submission does, mark as incorrect
  if (submission && !solution) {
    submission.correct = false;
    return submission;
  }

  // If both nodes are null, nothing to compare
  if (!submission && !solution) {
    return null;
  }

  // At this point, we know both submission and solution are non-null
  // TypeScript requires this check to understand both are non-null
  if (submission && solution) {
    // Check if values match - only comparing values as specified
    submission.correct = submission.value === solution.value;

    // Recursively check children
    if (submission.children && solution.children) {
      for (let i = 0; i < submission.children.length; i++) {
        const submissionChild = submission.children[i] || null;
        const solutionChild = i < solution.children.length ? solution.children[i] : null;

        if (submissionChild) {
          submission.children[i] = compareTreeSolutions(submissionChild, solutionChild);
        }
      }
    } else if (solution.children && solution.children.length > 0) {
      // Submission is missing children that solution has
      submission.correct = false;
    } else if (submission.children && submission.children.length > 0) {
      // Submission has extra children that solution doesn't have
      submission.correct = false;

      // Mark all extra children as incorrect
      // We've already checked that submission.children exists and has length > 0
      const children = submission.children; // Store reference to avoid null check errors
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child) {
          child.correct = false;
        }
      }
    }
  }

  return submission;
}
