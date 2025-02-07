import i18n from "@/translation/i18n";
import deFlag from "@assets/de.png";
import enFlag from "@assets/gb.png";
import globeIcon from "@assets/globeicon.png"; // Globus-Icon importieren
import { useRef } from "react";
import menuStyles from "./LanguageSelector.module.css";

const LANGUAGES = [
  { label: "EN", code: "en", flag: enFlag },
  { label: "DE", code: "de", flag: deFlag },
];

function LanguageSelector() {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
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
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LanguageSelector;
