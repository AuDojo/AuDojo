import AnimationSort from "../components/sortSensei/AnimationSort";
import SolveButton from "../components/sortSensei/SolveButton";
import SortingTable from "../components/sortSensei/SortingTable";

const MergeSort = () => {
  return (
    <>
      <div>
        <AnimationSort />
      </div>
      <div style={{ marginTop: "20px" }}>
        {/* Table */}
        <SortingTable />
        {/* right buttons */}
        <div></div>
      </div>
      {/* Solve buttons */}
      <div>
        <SolveButton />
      </div>
    </>
  );
};

export default MergeSort;
