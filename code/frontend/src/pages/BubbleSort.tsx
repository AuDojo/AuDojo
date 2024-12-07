import { D3SortVisualizer, SortHeader, SortTips } from "@components/sortSensei";
import { GenerateButtons, SolveButtons } from "@components/sortSensei/buttons";
import { BubbleSortGuide } from "@components/sortSensei/guide";
import { SortingTable } from "@components/sortSensei/table";
import { ButtonContextProvider, SortProvider } from "@contexts/index";
import styles from "@styles/sortSensei/general.module.css";
import tableStyles from "@styles/sortSensei/SortingTable.module.css";

const BubbleSort = () => {
  return (
    <SortProvider>
      <SortHeader />
      <div className={styles.container}>
        <div>
          <BubbleSortGuide />
          <D3SortVisualizer />
        </div>
        <div className={tableStyles["outer-table-buttons-container"]}>
          <div className={tableStyles["inner-table-buttons-container"]}>
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

export default BubbleSort;
