import { useSortContext } from "@hooks/index";
import cellStyles from "@styles/sortSensei/TableCell.module.css";
import rowStyles from "@styles/sortSensei/TableRow.module.css";

// Bind styles to classNames

const IndexRow = () => {
  const { stepsList } = useSortContext();
  return (
    <tr className={rowStyles["index-row-container"]}>
      <th className={rowStyles["index-row-index"]}></th>
      {stepsList[0].map((_, index) => (
        <td key={index} className={cellStyles["column-index"]}>
          {index}
        </td>
      ))}
    </tr>
  );
};

export default IndexRow;
