import { JSX, useState } from "react";
import { TreeTemplate } from "@/features/treeTutor/treeTemplate";
import styles from "./TreeTutor.module.css";

const TreeTutor: React.FC = () => {
  const [templates, setTemplates] = useState<{ id: number; element: JSX.Element }[]>([]);

  const addTemplate = (): void => {
    setTemplates([...templates, { id: Date.now(), element: <TreeTemplate /> }]);
  };

  return (
    <main className={styles.mainContent}>
      <section className={styles.treeContainer}>
        <h2 className={styles.insertHeader}>Insert X</h2>
        <div className={styles.treeWrapper}>
          <div className={styles.treeTemplate}>
            <h3>Initial Template</h3>
            <TreeTemplate />
          </div>

          {templates.map((template) => (
            <div key={template.id} className={styles.treeTemplate}>
              {template.element}
            </div>
          ))}

          <button className={styles.addTemplate} onClick={addTemplate}>
            +
          </button>
        </div>
        <div className="controls">
          <button>Practice Insert</button>
          <button>Practice Delete</button>
          <button>Random</button>
          <button className={styles.submit} onClick={addTemplate}>
            Submit
          </button>
        </div>
      </section>
    </main>
  );
};

export default TreeTutor;
