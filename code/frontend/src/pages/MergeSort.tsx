import { SortVisualizer } from "@/features/sortSensei/sortVisualizer";
import { ButtonContextProvider, SortProvider, TutorialModalProvider } from "@contexts/index";
import { GenerateButtons, SolveButtons } from "@features/sortSensei/buttons";
import { MergeSortGuide } from "@features/sortSensei/guide";
import { SideBarMenu } from "@features/sortSensei/sideBarMenu";
import { SortingTable } from "@features/sortSensei/table";
import { useSetTitle } from "@hooks/useSetTitle";
import styles from "@styles/sortSensei/general.module.css";

const MergeSort = () => {
  useSetTitle("MergeSort");
  return (
    <>
      <SortProvider>
        <TutorialModalProvider>
          <SideBarMenu />
          <div className={styles.container}>
            <div>
              <MergeSortGuide />
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
    </>
  );
};

export default MergeSort;
