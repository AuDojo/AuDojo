import { DifficultyLevel } from "./types";
import { TreeNode } from "./utils/treeUtils";

export const MAX_TEMPLATES = 4;
export const DEFAULT_TREE = [1, 5, 9, 7] as const;
export const MIN_VALUE = 1;
export const MAX_VALUE = 99;

export const difficultyObj = {
  random: -1,
  easy: 0,
  medium: 1,
  hard: 2,
} as const satisfies Record<string, DifficultyLevel>;

export const defaultRoot = {
  value: 0,
  height: 0,
  id: crypto.randomUUID(),
  position: "root",
  children: [null, null],
  depth: 0,
  balanceFactor: 0,
} as const satisfies TreeNode;
