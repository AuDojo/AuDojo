import { TreeNode } from "../treeUtils";

/**
 * Interface for each step to be recorded in the steps array for solution display
 * @tree root Node of the Tree after Operation has been carried out
 * @operation Name of the Operation, recorded to display it within the template per solution step
 */

export interface TreeStep {
  tree: TreeNode | null;
  operation: string;
}
export interface BalanceIndicator {
  tree: TreeNode | null;
  copy: TreeNode | null;
  operation: "RR" | "LL" | "RL" | "LR" | "NO";
}
