import { useEffect } from "react";

function addTitle(str: string) {
  return "Audojo - " + str;
}

function useSetTitle(to: string) {
  useEffect(() => {
    document.title = addTitle(to);
  }, []);
}

export default useSetTitle;
