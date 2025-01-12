import { useTranslation } from "react-i18next";
import tutheader from "./RickRollTroll.module.css";

const RickRollTroll = () => {
  const { t } = useTranslation("sortsensei-tutorial")
  return (
    <a className={tutheader["rainbow-text"]} href="https://www.youtube.com/watch?v=xvFZjo5PgG0">
      {t("rickroll.text") /*Hier klicken für die Lösungen zur Klausur!!!*/}
    </a>
  );
};

export default RickRollTroll;
