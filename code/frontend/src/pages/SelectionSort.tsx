import { ButtonContextProvider, SortProvider, TutorialModalProvider } from "@contexts/index";
import { GenerateButtons, SolveButtons } from "@features/sortSensei/buttons";
import { SelectionSortGuide } from "@features/sortSensei/guide";
import { SortHeader } from "@features/sortSensei/sortHeader";
import { SortingTable } from "@features/sortSensei/table";
import { SortVisualizer } from "@src/features/sortSensei/sortVisualizer";
import styles from "@styles/sortSensei/general.module.css";
import useSetTitle from "../hooks/title";

const SelectionSort = () => {
  useSetTitle("SelectionSort");

  return (
    <SortProvider>
      <TutorialModalProvider>
        <SortHeader />
        <div className={styles.container}>
          <div>
            <SelectionSortGuide />
            <SortVisualizer />
          </div>
          <div className={styles["outer-table-buttons-container"]}>
            <div className={styles["inner-table-buttons-container"]}>
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
