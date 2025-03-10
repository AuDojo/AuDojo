import styles from "./TemplateIndex.module.css";

interface TemplateIndexProps {
  currentTemplate: number;
  totalTemplates: number;
}

const TemplateIndex = ({ currentTemplate, totalTemplates }: TemplateIndexProps) => {
  const index = currentTemplate === 1 ? "Initial" : `${currentTemplate}/${totalTemplates}`;

  return <div className={styles["template-index"]}>{index}</div>;
};

export default TemplateIndex;
