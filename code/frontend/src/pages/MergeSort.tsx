import { D3SortVisualizer, SortHeader, SortTips } from "@components/sortSensei";
import { GenerateButtons, SolveButtons } from "@components/sortSensei/buttons";
import { MergeSortGuide } from "@components/sortSensei/guide";
import { SortingTable } from "@components/sortSensei/table";
import { ButtonContextProvider, SortProvider } from "@contexts/index";
import styles from "@styles/sortSensei/general.module.css";
import tableStyles from "@styles/sortSensei/SortingTable.module.css";

const MergeSort = () => {
  return (
    <SortProvider>
      <SortHeader />
      <div className={styles.container}>
        <div>
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
            <ButtonContextProvider>
              <GenerateButtons />
              <SolveButtons />
            </ButtonContextProvider>
          </div>
        </div>
      </div>
    </SortProvider>
  );
};

export default MergeSort;
