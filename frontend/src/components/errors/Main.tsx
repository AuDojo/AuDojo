import styles from "./Main.module.css";

/**
 * A fallback UI component for displaying an error message when an unexpected error occurs.
 */
const MainErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div className={styles["error-fallback"]} role="alert">
      <h2>Ooops, something went wrong :( </h2>
      <pre className={styles["error-message"]}>{error.message}</pre>
      <button type="button" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </button>
    </div>
  );
};

export default MainErrorFallback;
