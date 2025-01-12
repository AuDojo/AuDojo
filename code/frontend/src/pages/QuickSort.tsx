import { Loading } from "@/components/ui/loading";
import { ButtonContextProvider } from "@/features/sortSensei/buttons/context";
import { SortTypes } from "@/features/sortSensei/constants";
import { TutorialModalProvider } from "@/features/sortSensei/context";
import { SortProvider, useSortContext } from "@/features/sortSensei/context/SortContext";
import { QuickSortVisualizer } from "@/features/sortSensei/sortVisualizer";
import { TableProvider } from "@/features/sortSensei/table/context/TableContext";
import { GenerateButtons, SolveButtons } from "@features/sortSensei/buttons";
import { QuickSortGuide } from "@features/sortSensei/guide";
import { SideBarMenu } from "@features/sortSensei/sideBarMenu";
import { SortingTable } from "@features/sortSensei/table";
import { useSetTitle } from "@hooks/useSetTitle";
import styles from "@styles/sortSensei/general.module.css";

const QuickSortContent = () => {
  const { isLoading, error, pivotElements, selectionElements, mergeRanges, bubbleElements } = useSortContext();

  console.log(pivotElements, selectionElements, mergeRanges, bubbleElements);
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles["main-container"]}>
      <QuickSortGuide />
      <QuickSortVisualizer />
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
  );
};

const QuickSort = () => {
  useSetTitle("QuickSort");
  return (
    <TutorialModalProvider>
      <SideBarMenu />
      <SortProvider sortType={SortTypes.QuickSort}>
        <QuickSortContent />
      </SortProvider>
    </TutorialModalProvider>
  );
};

export default QuickSort;
