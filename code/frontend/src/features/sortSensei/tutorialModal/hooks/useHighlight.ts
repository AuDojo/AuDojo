import { useCallback } from "react";
import { HIGHLIGHT_CLASS } from "../constants";
import { RefKeys } from "../types";

/**
 * This hook provides functions to highlight and clear the highlighting of elements in the tutorial modal.
 * The highlight function adds a class name to the ref and scrolls it into view.
 * The clearHighlight function removes the class name from all refs.
 */
export const useHighlight = (highlightRefs: Record<RefKeys, React.RefObject<HTMLDivElement | null>>) => {
  const clearHighlight = useCallback(() => {
    Object.values(highlightRefs).forEach((el) => {
      if (el?.current) {
        el.current.classList.remove(HIGHLIGHT_CLASS);
      }
    });
  }, [highlightRefs]);

  const highlight = useCallback(
    (key: RefKeys) => {
      clearHighlight();
      if (highlightRefs[key]?.current) {
        highlightRefs[key].current.classList.add(HIGHLIGHT_CLASS);
        highlightRefs[key].current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    [clearHighlight, highlightRefs]
  );

  return { highlight, clearHighlight };
};
