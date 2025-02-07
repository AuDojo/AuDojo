import { Loading } from "@/components/ui/loading";
import { ButtonContextProvider } from "@/features/sortSensei/buttons/context";
import { SortTypes } from "@/features/sortSensei/constants";
import { TutorialModalProvider } from "@/features/sortSensei/context";
import { SortProvider, useSortContext } from "@/features/sortSensei/context/SortContext";
import { SelectionSortVisualizer } from "@/features/sortSensei/sortVisualizer";
import { TableProvider } from "@/features/sortSensei/table/context/TableContext";
import { GenerateButtons, SolveButtons } from "@features/sortSensei/buttons";
import { SelectionSortGuide } from "@features/sortSensei/guide";
import { SideBarMenu } from "@features/sortSensei/sideBarMenu";
import { SortingTable } from "@features/sortSensei/table";
import { useSetTitle } from "@hooks/useSetTitle";
import styles from "./SortSensei.module.css";

const SelectionSortContent = () => {
  const { isPending, error } = useSortContext();

  if (isPending) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles["main-container"]}>
      <SelectionSortGuide />
      <SelectionSortVisualizer />
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

const SelectionSort = () => {
  useSetTitle("SelectionSort");
  return (
    <TutorialModalProvider>
      <SideBarMenu />
      <SortProvider sortType={SortTypes.SelectionSort}>
        <SelectionSortContent />
      </SortProvider>
    </TutorialModalProvider>
  );
};

export default SelectionSort;
