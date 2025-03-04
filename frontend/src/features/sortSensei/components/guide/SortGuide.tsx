import { ReactNode } from "react";
import styles from "./SortGuide.module.css";

interface SortGuideProps {
  heading: string;
  renderGuideText: () => ReactNode;
}

const SortGuide = ({ heading: header, renderGuideText }: SortGuideProps) => {
  return (
    <aside className={styles["guide"]} aria-labelledby="guide-heading">
      <h3 id="guide-heading">{header}</h3>
      <p className={styles["step"]}>{renderGuideText()}</p>
    </aside>
  );
};
export default SortGuide;
