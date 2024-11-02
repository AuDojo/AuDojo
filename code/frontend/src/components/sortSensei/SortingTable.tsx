import { useSortContext } from "../../contexts/SortContext";
import TableRow from "./TableRow";

const SortingTable = () => {
  const { stepsList } = useSortContext();
  return (
    <div style={{ backgroundColor: "lightblue" }}>
      {stepsList.map((step, index) => (
        <TableRow key={index} step={step} index={index} />
      ))}
    </div>
  );
};

export default SortingTable;
