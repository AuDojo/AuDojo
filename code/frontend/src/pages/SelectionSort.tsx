import { D3SortVisualizer, SortHeader  } from "@components/sortSensei";
import { GenerateButtons, SolveButtons } from "@components/sortSensei/buttons";
import { SelectionSortGuide } from "@components/sortSensei/guide";
import { SortingTable } from "@components/sortSensei/table";
import { ButtonContextProvider, SortProvider, TutorialModalProvider } from "@contexts/index";
import styles from "@styles/sortSensei/general.module.css";
import tableStyles from "@styles/sortSensei/SortingTable.module.css";
import setTitle from "../../title";

const SelectionSort = () => {
  setTitle("SelectionSort");
  return (
    <SortProvider>
      <TutorialModalProvider>
        <SortHeader />
        <div className={styles.container}>
          <div>
            <SelectionSortGuide />
            <D3SortVisualizer />
          </div>
          <div className={tableStyles["outer-table-buttons-container"]}>
            <div className={tableStyles["inner-table-buttons-container"]}>
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
      </TutorialModalProvider>
    </SortProvider>
  );
};

export default SelectionSort;
