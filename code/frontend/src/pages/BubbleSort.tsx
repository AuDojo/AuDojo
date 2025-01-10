import { BubbleSortVisualizer } from "@features/sortSensei/sortVisualizer";
import { ButtonContextProvider, SortProvider, TutorialModalProvider } from "@contexts/index";
import { GenerateButtons, SolveButtons } from "@features/sortSensei/buttons";
import { BubbleSortGuide } from "@features/sortSensei/guide";
import { SideBarMenu } from "@features/sortSensei/sideBarMenu";
import { SortingTable } from "@features/sortSensei/table";
import { useSetTitle } from "@hooks/useSetTitle";
import styles from "@styles/sortSensei/general.module.css";

const BubbleSort = () => {
  useSetTitle("BubbleSort");
  return (
    <>
      <SortProvider>
        <TutorialModalProvider>
          <SideBarMenu />
          <div className={styles.container}>
            <div>
              <BubbleSortGuide />
              <BubbleSortVisualizer />
            </div>
            <div className={styles["outer-table-buttons-container"]}>
              <div className={styles["inner-table-buttons-container"]}>
                {/* Table */}
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

export default BubbleSort;
