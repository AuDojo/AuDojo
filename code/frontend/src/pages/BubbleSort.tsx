import AnimationSort from "../components/sortSensei/AnimationSort";
import SolveButtons from "../components/sortSensei/SolveButtons";
import SortHeader from "../components/sortSensei/SortHeader";
import SortingTable from "../components/sortSensei/SortingTable";
import { SortProvider } from "../contexts/SortContext";
import styles from "../styles/sortSensei/general.module.css";
import buttonsStyles from "../styles/sortSensei/Button.module.css";
import GenerateButtons from "../components/sortSensei/GenerateButtons";

const BubbleSort = () => {
  return (
    <SortProvider>
    <SortHeader />
    <div className={styles.container}>
      <div>
        <AnimationSort />
      </div>
      <div style={{ marginTop: "20px", display: "flex", position: "relative", alignItems: "center", justifyContent: "center" }}>
        {/* Table */}
        <SortingTable />
        {/* right buttons */}
        <div className={buttonsStyles["buttons-container"]}>
          <GenerateButtons />
          <SolveButtons />
        </div>
      </div>
      {/* Solve buttons */}
      <div></div>
    </div>
  </SortProvider>
  );
};

export default BubbleSort;