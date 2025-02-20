import { TreeTemplate } from "@/features/treeTutor/treeTemplate";
import styles from "./TreeTutor.module.css";
import { useState } from "react";

const TreeTutor = () => {
  const [templates, setTemplates] = useState<number[]>([]);

  const addTemplate = () => {
    if (templates.length < 2) {
      setTemplates([...templates, Date.now()]);
    }
  };

  const removeTemplate = (id: number) => {
    setTemplates(templates.filter((templateId) => templateId !== id));
  };

  return (
    <>
      <main className={styles.mainContent}>
        <section className={styles.treeContainer}>
          <h2 className={styles.insertHeader}>Insert X</h2>
          <div className={styles.treeWrapper}>
            <div className={styles.treeTemplate}>
              <h3>Initial Template</h3>
              <TreeTemplate />
            </div>
            {templates.map((id) => (
              <div key={id} className={styles.treeTemplate}>
                <button className={styles.closeButton} onClick={() => removeTemplate(id)}>
                  ✖
                </button>
                <TreeTemplate />
              </div>
            ))}
            {templates.length < 2 && (
              <button className={styles.addTemplate} onClick={addTemplate}>
                ➕
              </button>
            )}
          </div>
        </section>
        <div className={styles.controls}>
          <button className={styles.practiceInsertButton}>Practice Insert</button>
          <button className={styles.practiceDeleteButton}>Practice Delete</button>
          <button className={styles.randomModeButton}>Random Mode</button>
          <button className={styles.submit}>Submit</button>
        </div>
      </main>
    </>
  );
};

export default TreeTutor;
