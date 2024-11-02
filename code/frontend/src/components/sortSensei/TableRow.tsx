interface RowProps {
  step: number[];
  index: number;
}

const TableRow = ({ step, index }: RowProps) => {
  return (
    <div>
      {index}: {step}
    </div>
  );
};

export default TableRow;
