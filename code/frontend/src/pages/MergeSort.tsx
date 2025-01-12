import { SortProvider } from "@/contexts";
import { ButtonContextProvider } from "@/features/sortSensei/buttons/context";
import { TutorialModalProvider } from "@/features/sortSensei/context";
import { MergeSortVisualizer } from "@/features/sortSensei/sortVisualizer";
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
          <div>
            <MergeSortGuide />
            <MergeSortVisualizer />
            <div className={styles["outer-table-buttons-container"]}>
              <div className={styles["inner-table-buttons-container"]}>
                <SortingTable />
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
