import { useEffect, useState } from "react";
import AnimationSort from "../components/sortSensei/AnimationSort";

const MergeSort = () => {
  const [stepsList, setStepsList] = useState<number[][]>([]);
  const [step, setStep] = useState<number>(0);

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

  return (
    <>
      <div>
        <AnimationSort />
      </div>
      {/* Tabel and right buttons*/}
      <div></div>
      {/* Solve buttons */}
      <div></div>
    </>
  );
};

export default MergeSort;
