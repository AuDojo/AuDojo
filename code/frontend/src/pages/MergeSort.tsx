import AnimationSort from "../components/sortSensei/AnimationSort";
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
      <div></div>
    </>
  );
};

export default MergeSort;
