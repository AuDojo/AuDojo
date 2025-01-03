import { D3SortVisualizer, SortHeader } from "@components/sortSensei";
import { GenerateButtons, SolveButtons } from "@components/sortSensei/buttons";
import { MergeSortGuide } from "@components/sortSensei/guide";
import { SortingTable } from "@components/sortSensei/table";
import { TutorialModal } from "@components/sortSensei/tutorialModal";
import { ButtonContextProvider, SortProvider, TutorialModalProvider } from "@contexts/index";
import styles from "@styles/sortSensei/general.module.css";
import tableStyles from "@styles/sortSensei/SortingTable.module.css";
import setTitle from "../../title";

const MergeSort = () => {
  setTitle("MergeSort");
  return (
    <SortProvider>
      <TutorialModalProvider>
        <TutorialModal />
        <SortHeader />
        <div className={styles.container}>
          <div>
            <D3SortVisualizer />
            <MergeSortGuide />
          </div>
          <div className={tableStyles["outer-table-buttons-container"]}>
            <div className={tableStyles["inner-table-buttons-container"]}>
              {/* Left Tips */}
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

export default MergeSort;
