// import AnimationSort from "../components/sortSensei/AnimationSort";
import GenerateButtons from "../components/sortSensei/GenerateButtons";
import SolveButtons from "../components/sortSensei/SolveButtons";
import SortHeader from "../components/sortSensei/SortHeader";
import SortTips from "../components/sortSensei/SortTips";
import SortingTable from "../components/sortSensei/table/SortingTable";
import { SortProvider } from "../contexts/SortContext";
// import buttonsStyles from "../styles/sortSensei/Button.module.css";
import D3SortVisualizer from "../components/sortSensei/D3SortVisualizer";
import { MergeSortGuide } from "../components/sortSensei/guide/MergeSortGuide";
import styles from "../styles/sortSensei/general.module.css";
import tableStyles from "../styles/sortSensei/SortingTable.module.css";
import { ButtonContextProvider } from "../components/sortSensei/ButtonContext";

const MergeSort = () => {
  return (
    <SortProvider>
      <SortHeader />
      <div className={styles.container}>
        <div>
          {/* <AnimationSort /> */}
          <D3SortVisualizer />
          <MergeSortGuide />
        </div>
        <div className={tableStyles["outer-table-buttons-container"]}>
          <div className={tableStyles["inner-table-buttons-container"]}>
            {/* Left Tips */}
            <SortTips />
            {/* Table */}
            <SortingTable />
            {/* right buttons */}
            <div>
              <ButtonContextProvider>
                <GenerateButtons />
                <SolveButtons />
              </ButtonContextProvider>
            </div>
          </div>
        </div>
      </div>
    </SortProvider>
  );
};

export default MergeSort;
