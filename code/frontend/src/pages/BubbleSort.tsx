import { ButtonContextProvider, SortProvider, TutorialModalProvider } from "@contexts/index";
import { GenerateButtons, SolveButtons } from "@features/sortSensei/buttons";
import { BubbleSortGuide } from "@features/sortSensei/guide";
import { SortingTable } from "@features/sortSensei/table";
import { useSetTitle } from "@hooks/useSetTitle";
import { Footer } from "@src/components/footer";
import { Header } from "@src/components/header";
import styles from "@styles/sortSensei/general.module.css";
import BubbleSortVisualizer from "@src/features/sortSensei/sortVisualizer/BubbleSortVisualizer";
import { SideBarMenu } from "@features/sortSensei/sideBarMenu";

const BubbleSort = () => {
  useSetTitle("BubbleSort");
  return (
    <>
      <SortProvider>
        <TutorialModalProvider>
          <Header />
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
      <Footer />
    </>
  );
};

export default BubbleSort;
