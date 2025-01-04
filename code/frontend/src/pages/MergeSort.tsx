import { ButtonContextProvider, SortProvider, TutorialModalProvider } from "@contexts/index";
import { GenerateButtons, SolveButtons } from "@features/sortSensei/buttons";
import { MergeSortGuide } from "@features/sortSensei/guide";
import { SortingTable } from "@features/sortSensei/table";
import { SortVisualizer } from "@src/features/sortSensei/sortVisualizer";
import styles from "@styles/sortSensei/general.module.css";
import useSetTitle from "../hooks/title";
import { SideBarMenu } from "@features/sortSensei/sideBarMenu";
import { Header } from "@src/components/header";
import { Footer } from "@src/components/footer";

const MergeSort = () => {
  useSetTitle("MergeSort");
  return (
    <>
    <SortProvider>
      <TutorialModalProvider>
        <Header />
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
    <Footer/>
    </>
  );
};

export default MergeSort;
