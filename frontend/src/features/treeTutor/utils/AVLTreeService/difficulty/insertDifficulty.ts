import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import {
  DifficultyTypes,
  Difficulty,
  getRandomInt,
  numToDifficultyTypes,
  getExistingNodes,
  createCopyOfTree,
} from "./difficultyTools";
import { getBalanceFactor } from "../getters";
import { createNode } from "../changingTree/insertAndDelete";

export function createInsertArray(node: TreeNode, difficulty_level: DifficultyTypes): number[] {
  if (Difficulty.random) {
    let random_number = getRandomInt(3);
    difficulty_level = numToDifficultyTypes(random_number);
  }

  switch (difficulty_level) {
    case Difficulty.easy:
      return createEasyDifficultyArray(node);
      break;
    case Difficulty.medium:
      return createMediumDifficultyArray(node);
      break;
    case Difficulty.hard:
      return createHartDifficultyArray(node);
      break;

    default:
      return [];
      break;
  }
}

function arrayWithoutExistingNodes(node: TreeNode): number[] {
  let allNumbers: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  let excistingNodes: number[] = [];
  getExistingNodes(node, excistingNodes);

  // Calculates the difference (A\B) allNumbers without excistingNodes
  let diff = allNumbers.filter(function (x) {
    return excistingNodes.indexOf(x) < 0;
  });

  return diff;
}

function removeToDeepNodes() {}

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

  // TODO: Update hight and Balance
}

function createEasyDifficultyArray(node: TreeNode): number[] {
  let node_copy = createCopyOfTree(node);
  let availableInserts: number[] = arrayWithoutExistingNodes(node);
  let easyInserts: number[] = [];

  // let random_num: number = getRandomInt(availableInserts.length);
  // let new_node: TreeNode = createNode(availableInserts[random_num], 0, "root");

  availableInserts.forEach((value) => {
    const inserted_node: TreeNode = binaryTreeInsertion(node_copy, value, 0, "root");
    let balance_factor = getBalanceFactor(node_copy);
    if (balance_factor >= -1 && balance_factor <= 1) {
      easyInserts.push(value);
    }
  });

  return easyInserts;
}

// function createMediumDifficultyArray(node: TreeNode): number[] {
//   Array.from({ length: 10 }, (_, i) => i + 1);
// }

// function createHartDifficultyArray(node: TreeNode): number[] {
//   Array.from({ length: 10 }, (_, i) => i + 1);
// }
