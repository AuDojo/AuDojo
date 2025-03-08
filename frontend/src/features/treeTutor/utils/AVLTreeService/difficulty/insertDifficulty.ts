import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { DifficultyTypes, Difficulty, getRandomInt, numToDifficultyTypes, getExistingNodes } from "./difficultyTools";

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

function createEasyDifficultyArray(node: TreeNode): number[] {
  let availableInserts: number[] = arrayWithoutExistingNodes(node);

  return availableInserts;
}

function createMediumDifficultyArray(node: TreeNode): number[] {
  Array.from({ length: 10 }, (_, i) => i + 1);
}

function createHartDifficultyArray(node: TreeNode): number[] {
  Array.from({ length: 10 }, (_, i) => i + 1);
}
