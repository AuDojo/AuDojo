import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import {
  DifficultyTypes,
  Difficulty,
  getRandomInt,
  numToDifficultyTypes,
  getExistingNodes,
  createCopyOfTree,
  getNumberOfRotates,
} from "./difficultyTools";
// import { getBalanceFactor } from "../getters";
import { createNode } from "../changingTree/insertAndDelete";
import { updateAllHeightsRecursive } from "../updateTreeAttributes";

export function createInsertArray(node: TreeNode, difficulty_level: DifficultyTypes): number[] {
  if (Difficulty.random) {
    const random_number = getRandomInt(3);
    difficulty_level = numToDifficultyTypes(random_number);
  }

  switch (difficulty_level) {
    case Difficulty.easy:
      return createDifficultyArray(node, 0);
      break;
    case Difficulty.medium:
      return createDifficultyArray(node, 1);
      break;
    case Difficulty.hard:
      return createDifficultyArray(node, 2);
      break;

    default:
      return [];
      break;
  }
}

function arrayWithoutExistingNodes(node: TreeNode): number[] {
  const allNumbers: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  const excistingNodes: number[] = [];
  getExistingNodes(node, excistingNodes);

  // Calculates the difference (A\B) allNumbers without excistingNodes
  const diff = allNumbers.filter(function (x) {
    return !excistingNodes.includes(x);
  });

  return diff;
}

// function removeToDeepNodes() {}

function binaryTreeInsertion(
  node: TreeNode | null,
  value: number,
  depth: number,
  position: "root" | "left" | "right"
): TreeNode {
  if (node === null) {
    return createNode(value, depth, position);
  }
  if (node.value === value) {
    return node;
  }
  if (value < node.value) {
    node.children[0] = binaryTreeInsertion(node.children[0], value, ++depth, "left");
  } else if (value > node.value) {
    node.children[1] = binaryTreeInsertion(node.children[1], value, ++depth, "right");
  }
  return node;
}

function createDifficultyArray(node: TreeNode, difficulty: number): number[] {
  const availableInserts: number[] = arrayWithoutExistingNodes(node);
  const matchingInserts: number[] = [];

  // let random_num: number = getRandomInt(availableInserts.length);
  // let new_node: TreeNode = createNode(availableInserts[random_num], 0, "root");

  availableInserts.forEach((value) => {
    const node_copy = createCopyOfTree(node);
    if (node_copy !== null) {
      const inserted_node: TreeNode = binaryTreeInsertion(node_copy, value, 0, "root");
      updateAllHeightsRecursive(node_copy);
      // let balance_factor = getBalanceFactor(node_copy);
      if (getNumberOfRotates(node_copy, inserted_node) === difficulty) {
        matchingInserts.push(value);
      }
    }
  });

  return matchingInserts;
}

// function createEasyDifficultyArray(node: TreeNode): number[] {
//   let node_copy = createCopyOfTree(node);
//   let availableInserts: number[] = arrayWithoutExistingNodes(node);
//   let easyInserts: number[] = [];

//   // let random_num: number = getRandomInt(availableInserts.length);
//   // let new_node: TreeNode = createNode(availableInserts[random_num], 0, "root");

//   availableInserts.forEach((value) => {
//     const inserted_node: TreeNode = binaryTreeInsertion(node_copy, value, 0, "root");
//     let balance_factor = getBalanceFactor(node_copy);
//     if (balance_factor >= -1 && balance_factor <= 1) {
//       easyInserts.push(value);
//     }
//   });

//   return easyInserts;
// }

// function createMediumDifficultyArray(node: TreeNode): number[] {
//   Array.from({ length: 10 }, (_, i) => i + 1);
// }

// function createHartDifficultyArray(node: TreeNode): number[] {
//   Array.from({ length: 10 }, (_, i) => i + 1);
// }
