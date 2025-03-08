import tutorialsidebar from "./TutorialSidebar.module.css";
import { StepVisualizer } from "../stepVisualizer";
import { Step } from "../../types";
import { useTranslation } from "react-i18next";

const TutorialSidebar = ({
  algexp,
  photo,
  sortsteps,
  sortType,
}: {
  algexp: React.ReactNode;
  photo: React.ReactNode;
  sortsteps: Step[];
  sortType: string;
}) => {
  const { t } = useTranslation("sortsensei-tutorial");

  return (
    <div className={tutorialsidebar["sidebar"]}>
      <div className={tutorialsidebar["section-content"]}>
        <TutorialSubSidebar title={t("subheader2")}>{photo}</TutorialSubSidebar>

        <StepVisualizer steps={sortsteps} sortType={sortType} />

        <div className={tutorialsidebar["sidebar"]}>
          <h1>{t("subheader1")}</h1>
          <span>{algexp}</span>
        </div>
      </div>
    </div>
  );
};

const TutorialSubSidebar = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className={tutorialsidebar["sidebar"]}>
      <details className={tutorialsidebar["section-header"]}>
        <summary className={tutorialsidebar["sidebar-subtitle"]}>{title}</summary>
        <div className={tutorialsidebar["section-content"]}>{children}</div>
      </details>
    </div>
  );
};

export default TutorialSidebar;
