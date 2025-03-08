import { TreeNode } from "../treeUtils";

// Pretty print the tree for debugging

export function printTree(node: TreeNode | null, prefix = "", isLeft = true): void {
  if (!node) return;

  console.log(`${prefix}${isLeft ? "├── " : "└── "}${node.value} (h:${node.height}, bf:${node.balanceFactor})`);

  printTree(node.children[0], `${prefix}${isLeft ? "│   " : "    "}`, true);
  printTree(node.children[1], `${prefix}${isLeft ? "│   " : "    "}`, false);
}
