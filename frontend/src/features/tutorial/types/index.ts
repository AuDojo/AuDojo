export interface Step {
  description: string;
  data: { array: number[]; color: string }[];
}

export interface Tree {
  value: number | null;
  children?: [Tree, Tree];
  balanceFactor?: number;
  color?: string;
}

export interface TreeSteps {
  steps: { description: string; tree: Tree }[];
}
