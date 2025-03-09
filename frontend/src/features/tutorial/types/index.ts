export interface Step {
  description: string;
  data: { array: number[]; color: string }[];
}

export interface Tree {
  value: number;
  children: [Tree | null, Tree | null];
  balanceFactor?: number;
  color: String;
  position: String;
}

export interface TreeSteps {
  steps: { description: string; tree: Tree }[];
}
