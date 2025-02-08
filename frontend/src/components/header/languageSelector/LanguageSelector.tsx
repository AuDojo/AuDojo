import deFlag from "@/assets/de.png";
import enFlag from "@/assets/gb.png";
import globeIcon from "@/assets/globeicon.png"; // Globus-Icon importieren
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import menuStyles from "./LanguageSelector.module.css";

const LANGUAGES = [
  { label: "EN", code: "en", flag: enFlag },
  { label: "DE", code: "de", flag: deFlag },
];

function LanguageSelector() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  const isLanguageSelected = (code: string) => {
    return i18n.language === code;
  };

  return (
    <div className={menuStyles.languageSelector} ref={dropdownRef}>
      {/* Globus-Icon mit Hoverfunktion */}
      <div className={menuStyles.globeContainer}>
        <img src={globeIcon} alt="Globe Icon" className={menuStyles.globeIcon} />
      </div>

      {/* Dropdown-Menü */}
      <div className={menuStyles.dropdown}>
        {LANGUAGES.map(({ code, label, flag }) => (
          <div key={code} className={menuStyles.dropdownItem} onClick={() => handleLanguageChange(code)}>
            <img src={flag} alt={`${code} flag`} className={menuStyles.flagIcon} />
            {label} {isLanguageSelected(code) && <span className={menuStyles.checkmark}>✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LanguageSelector;
