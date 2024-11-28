import GenerateButtons from "../components/sortSensei/buttons/GenerateButtons";
import SolveButtons from "../components/sortSensei/buttons/SolveButtons";
import SortHeader from "../components/sortSensei/SortHeader";
import SortTips from "../components/sortSensei/SortTips";
import SortingTable from "../components/sortSensei/table/SortingTable";
import { SortProvider } from "../contexts/SortContext";
import D3SortVisualizer from "../components/sortSensei/D3SortVisualizer";
import { SelectionSortGuide } from "../components/sortSensei/guide/SelectionSortGuide";
import styles from "../styles/sortSensei/general.module.css";
import tableStyles from "../styles/sortSensei/SortingTable.module.css";
import { ButtonContextProvider } from "../components/sortSensei/buttons/ButtonContext";

const SelectionSort = () => {
  return (
    <SortProvider>
      <SortHeader />
      <div className={styles.container}>
        <div>
          <SelectionSortGuide />
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

export default SelectionSort;
