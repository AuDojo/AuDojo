import { Loading } from "@/components/ui/loading";
import { GenerateButtons, SolveButtons } from "@/features/sortSensei/components/buttons";
import { ButtonContextProvider } from "@/features/sortSensei/components/buttons/context";
import { QuickSortGuide } from "@/features/sortSensei/components/guide";
import { HelpIcon } from "@/features/sortSensei/components/helpIcon";
import { SideBarMenu } from "@/features/sortSensei/components/sideBarMenu";
import { QuickSortVisualizer } from "@/features/sortSensei/components/sortVisualizer";
import { SortingTable } from "@/features/sortSensei/components/table";
import { TableProvider } from "@/features/sortSensei/components/table/context/TableContext";
import { TutorialModal } from "@/features/sortSensei/components/tutorialModal";
import { SortTypes } from "@/features/sortSensei/constants";
import { TutorialModalProvider } from "@/features/sortSensei/context";
import { SortProvider, useSortContext } from "@/features/sortSensei/context/SortContext";
import { useSetTitle } from "@/hooks/useSetTitle";
import styles from "./SortSensei.module.css";

const QuickSortContent = () => {
  const { isPending, error } = useSortContext();

  if (isPending) {
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
      <HelpIcon />
      <SideBarMenu />
      <TutorialModal />
      <SortProvider sortType={SortTypes.QuickSort}>
        <QuickSortContent />
      </SortProvider>
    </TutorialModalProvider>
  );
};

export default QuickSort;
