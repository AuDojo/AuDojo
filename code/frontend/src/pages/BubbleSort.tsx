import { SortProvider } from "@/contexts";
import { ButtonContextProvider } from "@/features/sortSensei/buttons/context";
import { TutorialModalProvider } from "@/features/sortSensei/context";
import { useSetTitle } from "@/hooks";
import { GenerateButtons, SolveButtons } from "@features/sortSensei/buttons";
import { BubbleSortGuide } from "@features/sortSensei/guide";
import { SideBarMenu } from "@features/sortSensei/sideBarMenu";
import { BubbleSortVisualizer } from "@features/sortSensei/sortVisualizer";
import { SortingTable } from "@features/sortSensei/table";
import styles from "@styles/sortSensei/general.module.css";

const BubbleSort = () => {
  useSetTitle("BubbleSort");
  return (
    <>
      <SortProvider>
        <TutorialModalProvider>
          <SideBarMenu />
          <div>
            <BubbleSortGuide />
            <BubbleSortVisualizer />
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

export default BubbleSort;
