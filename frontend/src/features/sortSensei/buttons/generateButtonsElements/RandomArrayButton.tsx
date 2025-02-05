import { useTranslation } from "react-i18next";
import buttonStyles from "./GenerateButtons.module.css";
const RandomArrayButton = () => {
  const { t } = useTranslation("sortsensei");
  return (
    <button className={buttonStyles["random-array-button"]} aria-label="Random [R]" data-tooltip="top">
      {t("button.new-random")}
    </button>
  );
};

export default RandomArrayButton;
