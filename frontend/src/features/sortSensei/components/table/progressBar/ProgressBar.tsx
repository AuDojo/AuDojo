import { useTableContext } from "@/features/sortSensei/components/table/context";
import { useTranslation } from "react-i18next";
import { useGetPoints } from "../hooks/useGetPoints";
import styles from "./ProgressBar.module.css";

const ProgressBar = () => {
  const { cellsValidation } = useTableContext();
  const { currentPoints, totalPoints } = useGetPoints(cellsValidation);
  const { t } = useTranslation("sortsensei");

  return (
    <div
      className={styles["progress-bar-container"]}
      aria-label={t("current-points", { currentPoints, totalPoints })}
      data-tooltip="top 200"
    >
      <meter
        min={0}
        max={totalPoints}
        low={totalPoints / 4}
        high={totalPoints / 2}
        optimum={totalPoints}
        value={currentPoints}
        className={styles["progress-bar"]}
      />
    </div>
  );
};

export default ProgressBar;
