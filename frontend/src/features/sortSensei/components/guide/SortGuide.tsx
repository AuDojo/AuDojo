import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import styles from "./SortGuide.module.css";

interface SortGuideProps {
  heading: string;
  guideText: ReactNode;
  hint?: ReactNode;
}

const SortGuide = ({ heading, guideText, hint }: SortGuideProps) => {
  const { t } = useTranslation("sortsensei", { keyPrefix: "guide" });

  return (
    <aside className={styles["guide"]} aria-labelledby="guide-heading">
      <h3 id="guide-heading">{heading}</h3>
      <p className={styles["step"]}>{guideText}</p>
      {hint && (
        <details className={styles["hint"]}>
          <summary>{t("hints")}</summary>
          {hint}
        </details>
      )}
    </aside>
  );
};
export default SortGuide;
