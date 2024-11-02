import { useEffect, useState } from "react";

const MergeSort = () => {
  const [stepsList, setStepsList] = useState<number[][]>([]);

  useEffect(() => {
    async function fetchStepsList() {
      const response = await fetch("/api/sorting/mergesort", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startArray: [7, 13, 5, 9, 10, 12, 1, 3, 2, 6, 25, 30, 40, 38, 32],
        }),
      });
      const data = await response.json();
      setStepsList(JSON.parse(data).processList);
    }

    fetchStepsList();
  }, []);

  return <div>MergeSort</div>;
};

export default MergeSort;
