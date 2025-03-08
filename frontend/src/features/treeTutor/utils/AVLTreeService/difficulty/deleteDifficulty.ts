import { TreeNode } from "@/features/treeTutor/utils/treeUtils";
import { DifficultyTypes, Difficulty, getRandomInt, numToDifficultyTypes } from "./difficultyTools";

export function createDeleteArray(node: TreeNode, difficulty_level: DifficultyTypes): number[] {
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

function createEasyDifficultyArray(node: TreeNode): number[] {}

function createMediumDifficultyArray(node: TreeNode): number[] {}

function createHartDifficultyArray(node: TreeNode): number[] {}
