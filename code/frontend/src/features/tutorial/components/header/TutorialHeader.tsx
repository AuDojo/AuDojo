import audojoLogo from "@assets/logo-audojo.png";
import { Link, useNavigate } from "react-router-dom";
import headerStyles from "./TutorialHeader.module.css";

const TutorialHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={headerStyles["header-container"]}>
      <Link to={"/"}>
        <div className={headerStyles["header-logo-container"]}>
          <div className={headerStyles["header-logo-text"]}>AUDOJO</div>
          <img className={headerStyles["header-logo-image"]} src={audojoLogo} alt="audojo logo" />
        </div>
      </Link>
      <div className={headerStyles["back-buttons"]}>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default TutorialHeader;
