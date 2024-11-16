import AnimationSort from "../components/sortSensei/AnimationSort";
import SolveButtons from "../components/sortSensei/SolveButtons";
import SortHeader from "../components/sortSensei/SortHeader";
import SortingTable from "../components/sortSensei/SortingTable";
import { SortProvider } from "../contexts/SortContext";
import styles from "../styles/sortSensei/general.module.css";
import buttonsStyles from "../styles/sortSensei/Button.module.css";
import styles from "../styles/sortSensei/general.module.css";
import tableStyles from "../styles/sortSensei/SortingTable.module.css";
import { BubbleSortGuide } from "../components/sortSensei/guide/BubbleSortGuide";

const BubbleSort = () => {
  return (
    <SortProvider>
      <SortHeader />
      <div className={styles.container}>
        <div style={{ display: "flex" }}>
          <BubbleSortGuide />
          <AnimationSort />
        </div>
        <div className={tableStyles["outer-table-buttons-container"]}>
          <div className={tableStyles["inner-table-buttons-container"]}>
            <SortTips />
            {/* Table */}
            <SortingTable sortType="bubblesort" />
            {/* right buttons */}
            <div className={buttonsStyles["buttons-container"]}>
              <GenerateButtons />
              <SolveButtons />
            </div>
          </div>
        </div>
      </div>
    </SortProvider>
  );
};

export default BubbleSort;