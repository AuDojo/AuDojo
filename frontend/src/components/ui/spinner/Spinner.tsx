import classNames from "classnames";
import styles from "./Spinner.module.css"; // Import the CSS file

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
}

const Spinner = ({ size = "md" }: SpinnerProps) => {
  const sizeClass = {
    sm: "spinner-sm",
    md: "spinner-md",
    lg: "spinner-lg",
    xl: "spinner-xl",
  };

  return (
    <div role="alert" className={styles["spinner-wrapper"]}>
      <svg
        // aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={classNames(styles.spinner, styles[sizeClass[size]])}
      >
        {/* <path d="M21 12a9 9 0 1 1-6.219-8.56" /> */}
      </svg>
    </div>
  );
};

export default Spinner;
