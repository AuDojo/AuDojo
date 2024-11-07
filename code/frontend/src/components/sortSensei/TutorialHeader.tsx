import { Link, useNavigate } from "react-router-dom";
import audojoLogo from "../../assets/logo-audojo.png";
import headerStyles from "../../styles/sortSensei/SortHeader.module.css";
import buttonStyles from "../../styles/sortSensei/Button.module.css";

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
        <div className={headerStyles["header-logo-text"]}>
            <div className={buttonStyles["generate-buttons"]}>
                <button onClick={()=>navigate(-1)}>Back</button>
            </div>
        </div>
    </div>
  );
};

export default TutorialHeader;
