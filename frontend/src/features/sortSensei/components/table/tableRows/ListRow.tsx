import { useState } from "react";
import { useSortContext } from "@/features/sortSensei/context/SortContext";
import classNames from "classnames/bind";
import ListCell from "../tableCell/ListCell";
import styles from "./TableRow.module.css";
import { useTutorialModalContext } from "@features/sortSensei/context";

// Bind styles to classNames
const cx = classNames.bind(styles);

const ListRow = () => {
  const { sharedArray } = useSortContext();
  const [isMarked, setIsMarked] = useState<boolean>(false);
  const { highlightRefs } = useTutorialModalContext();

  return (
    <div ref={highlightRefs.listRow} className={cx("start-row-container")}>
      <span className={cx("list-index")}>List</span>
      {sharedArray.map((_, index) => (
        <ListCell key={index} columnIndex={index} isMarked={isMarked} setIsMarked={setIsMarked} />
      ))}
    </div>
  );
};

export default ListRow;
