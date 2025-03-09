import { Dispatch, SetStateAction, useState } from "react";
import { defaultRoot, MAX_TEMPLATES } from "../constants";
import { generateAVL } from "../utils/AVLTreeService/excerciseUtils";
import { TreeNode } from "../utils/treeUtils";

/**
 * Custom hook for managing tree templates.
 */
export function useTreeTemplates(initialTreeData: TreeNode, setInitialTreeData: Dispatch<SetStateAction<TreeNode>>) {
  const initialID = Date.now();

  const [templates, setTemplates] = useState<number[]>([initialID]);
  const [currentTemplate, setCurrentTemplate] = useState(0);
  const [templateTree, setTemplateTree] = useState<Record<number, TreeNode>>({
    [initialID]: initialTreeData,
  });

  const addTemplate = () => {
    if (templates.length < MAX_TEMPLATES) {
      const newId = Date.now();
      setTemplates((prev) => [...prev, newId]);
      setTemplateTree((prev) => ({
        ...prev,
        [newId]: structuredClone(initialTreeData),
      }));
    }
  };

  const removeTemplate = (id: number) => {
    setTemplates((prev) => prev.filter((templateId) => templateId !== id));

    setTemplateTree((prev) => {
      const { [id]: _, ...restOfTemplates } = prev;
      return restOfTemplates;
    });
  };

  const updateTemplateTree = (id: number, newTree: TreeNode) => {
    setTemplateTree((prev) => ({ ...prev, [id]: newTree }));
  };

  const resetTemplates = () => {
    const newSample = generateAVL(true, null);
    const newID = Date.now();
    setInitialTreeData(newSample ?? defaultRoot);
    setTemplates([newID]);
    setTemplateTree({ [newID]: newSample ?? defaultRoot });
    setCurrentTemplate(0);
  };

  return {
    templates,
    currentTemplate,
    setCurrentTemplate,
    templateTree,
    addTemplate,
    removeTemplate,
    updateTemplateTree,
    resetTemplates,
  };
}
