import { SortProvider } from "@/contexts";
import { ButtonContextProvider } from "@/features/sortSensei/buttons/context";
import { TutorialModalProvider } from "@/features/sortSensei/context";
import { QuickSortVisualizer } from "@/features/sortSensei/sortVisualizer";
import { GenerateButtons, SolveButtons } from "@features/sortSensei/buttons";
import { QuickSortGuide } from "@features/sortSensei/guide";
import { SideBarMenu } from "@features/sortSensei/sideBarMenu";
import { SortingTable } from "@features/sortSensei/table";
import { useSetTitle } from "@hooks/useSetTitle";
import styles from "@styles/sortSensei/general.module.css";

const QuickSort = () => {
  useSetTitle("QuickSort");
  return (
    <>
      <SortProvider>
        <TutorialModalProvider>
          <SideBarMenu />
          <div>
            <QuickSortGuide />
            <QuickSortVisualizer />
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

export default QuickSort;
