import { Loading } from "@/components/ui/loading";
import { SortTypes } from "@/constants";
import { ButtonContextProvider } from "@/features/sortSensei/buttons/context";
import { TutorialModalProvider } from "@/features/sortSensei/context";
import { SortProvider, useSortContext } from "@/features/sortSensei/context/SortContext";
import { MergeSortVisualizer } from "@/features/sortSensei/sortVisualizer";
import { TableProvider } from "@/features/sortSensei/table/context/TableContext";
import { GenerateButtons, SolveButtons } from "@features/sortSensei/buttons";
import { MergeSortGuide } from "@features/sortSensei/guide";
import { SideBarMenu } from "@features/sortSensei/sideBarMenu";
import { SortingTable } from "@features/sortSensei/table";
import { useSetTitle } from "@hooks/useSetTitle";
import styles from "@styles/sortSensei/general.module.css";

const MergeSortContent = () => {
  const { isLoading, error } = useSortContext();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <TutorialModalProvider>
        <SideBarMenu />
        <MergeSortGuide />
        <div className={styles["main-container"]}>
          <MergeSortVisualizer />
          <div className={styles["outer-table-buttons-container"]}>
            <div className={styles["inner-table-buttons-container"]}>
              <TableProvider>
                {/* Table */}
                <SortingTable />
                <ButtonContextProvider>
                  <GenerateButtons />
                  <SolveButtons />
                </ButtonContextProvider>
              </TableProvider>
            </div>
          </div>
        </div>
      </TutorialModalProvider>
    </>
  );
};

const MergeSort = () => {
  useSetTitle("MergeSort");
  return <SortProvider sortType={SortTypes.MergeSort}>{<MergeSortContent />}</SortProvider>;
};

export default MergeSort;
