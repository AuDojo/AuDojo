// import AnimationSort from "../components/sortSensei/AnimationSort";
import GenerateButtons from "../components/sortSensei/buttons/GenerateButtons";
import SolveButtons from "../components/sortSensei/buttons/SolveButtons";
import SortHeader from "../components/sortSensei/SortHeader";
import SortTips from "../components/sortSensei/SortTips";
import SortingTable from "../components/sortSensei/table/SortingTable";
import { SortProvider } from "../contexts/SortContext";
// import buttonsStyles from "../styles/sortSensei/Button.module.css";
import D3SortVisualizer from "../components/sortSensei/D3SortVisualizer";
import { BubbleSortGuide } from "../components/sortSensei/guide/BubbleSortGuide";
import styles from "../styles/sortSensei/general.module.css";
import tableStyles from "../styles/sortSensei/SortingTable.module.css";

const BubbleSort = () => {
  return (
    <SortProvider>
      <SortHeader />
      <div className={styles.container}>
        <div>
          <BubbleSortGuide />
          <D3SortVisualizer />
          {/* <AnimationSort /> */}
        </div>
        <div className={tableStyles["outer-table-buttons-container"]}>
          <div className={tableStyles["inner-table-buttons-container"]}>
            <SortTips />
            {/* Table */}
            <SortingTable />
            {/* right buttons */}
            <div>
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
