import AnimationSort from "../components/sortSensei/AnimationSort";
import GenerateButtons from "../components/sortSensei/GenerateButtons";
import SolveButtons from "../components/sortSensei/SolveButtons";
import SortHeader from "../components/sortSensei/SortHeader";
import SortingTable from "../components/sortSensei/SortingTable";
import { SortProvider } from "../contexts/SortContext";
import buttonsStyles from "../styles/sortSensei/Button.module.css";
import styles from "../styles/sortSensei/general.module.css";
import tableStyles from "../styles/sortSensei/SortingTable.module.css";
const MergeSort = () => {
  return (
    <SortProvider>
      <SortHeader />
      <div className={styles.container}>
        <div>
          <AnimationSort />
        </div>
        <div className={tableStyles["outer-table-buttons-container"]}>
          <div className={tableStyles["inner-table-buttons-container"]}>
            {/* Table */}
            <SortingTable />
            {/* right buttons */}
            <div className={buttonsStyles["buttons-container"]}>
              <GenerateButtons />
              <SolveButtons />
            </div>
          </div>
        </div>
      </div>
    </SortProvider>
  );
};

export default MergeSort;
