import { Tooltip } from "@/components/ui/tooltip";
import { paths } from "@/config/paths";
import { useLocation } from "react-router-dom";
import { useTutorialModalContext } from "../../context";
import helpIcon from "./help-icon.png";
import styles from "./HelpIcon.module.css";

//TODO: style this not fixed, but as normal element
const HelpIcon = () => {
  const { toggleModal } = useTutorialModalContext();
  const location = useLocation();
  const allowedPaths = new Set<string>([paths.mergeSort, paths.bubbleSort, paths.selectionSort, paths.quickSort]);

  if (!allowedPaths.has(location.pathname)) {
    return null;
  }

  return (
    <div className={styles["icon-container"]} onClick={toggleModal}>
      <Tooltip content="Tutorial" position="bottom" delay={1000}>
        <img src={helpIcon} className={styles["help-icon"]} />
      </Tooltip>
    </div>
  );
};

export default HelpIcon;
