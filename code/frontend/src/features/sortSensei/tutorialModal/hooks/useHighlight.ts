import { useCallback } from "react";
import { HIGHLIGHT_CLASS } from "../constants";
import { RefKeys } from "../types";

/**
 * This hook provides functions to highlight and clear the highlighting of elements in the tutorial modal.
 * The highlight function adds a class name to the ref and scrolls it into view.
 * The clearHighlight function removes the class name from all refs.
 */
export const useHighlight = (refs: Record<RefKeys, React.RefObject<HTMLDivElement | null>>) => {
  const clearHighlight = useCallback(() => {
    Object.values(refs).forEach((el) => {
      if (el?.current) {
        el.current.classList.remove(HIGHLIGHT_CLASS);
      }
    });
  }, [refs]);

  const highlight = useCallback(
    (key: RefKeys) => {
      clearHighlight();
      if (refs[key]?.current) {
        refs[key].current.classList.add(HIGHLIGHT_CLASS);
        refs[key].current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    [refs, clearHighlight]
  );

  return { highlight, clearHighlight };
};
