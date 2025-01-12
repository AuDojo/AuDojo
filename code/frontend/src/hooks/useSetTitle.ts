import { useEffect } from "react";

function addTitle(str: string) {
  return "Audojo - " + str;
}

export function useSetTitle(to: string) {
  useEffect(() => {
    document.title = addTitle(to);
  }, []);
}
