import React, { useEffect, useRef, useState } from "react";
import menuStyles from "./LanguageSelector.module.css";
import i18n from "@/translation/i18n";
import globeIcon from "@assets/globeicon.png"; // Globus-Icon importieren
import deFlag from "@assets/de.png";
import enFlag from "@assets/gb.png";

const LANGUAGES = [
  { label: "EN", code: "en", flag: enFlag },
  { label: "DE", code: "de", flag: deFlag },
];

function LanguageSelector() {
  const [languageSelected, setLanguage] = useState("de");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLanguageChange = (code: string) => {
    setLanguage(code);
    i18n.changeLanguage(code);
    console.log("il8next.language: " + i18n.language);
    setIsDropdownOpen(false); // Schließt das Dropdown nach der Auswahl
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={menuStyles.languageSelector} ref={dropdownRef}>
      {/* Globus-Icon mit Klickfunktion */}
      <div className={menuStyles.globeContainer} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <img src={globeIcon} alt="Globe Icon" className={menuStyles.globeIcon} />
      </div>

      {/* Dropdown-Menü */}
      {isDropdownOpen && (
        <div className={menuStyles.dropdown}>
          {LANGUAGES.map(({ code, label, flag }) => (
            <div key={code} className={menuStyles.dropdownItem} onClick={() => handleLanguageChange(code)}>
              <img src={flag} alt={`${code} flag`} className={menuStyles.flagIcon} />
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
