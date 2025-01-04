import React from "react";
import menuStyles from "./LanguageSelector.module.css"
import i18n from "@src/translation/i18n";

const LANGUAGES = [
    { label: "EN", code: "en", flag: "../assets/de.png" },
    { label: "DE", code: "de",  flag: "../assets/gb.png"}
]

const options = LANGUAGES.map(({ code, label }) => ({
  value: code,
  label: label,
}));


function LanguageSelector() {

  const [languageSelected, setLanguage] = React.useState("de");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    const selectedLanguage = event.target.value;

    switch(selectedLanguage) {
      case "de":
        setLanguage("de");
        break;
      case "en":
        setLanguage("en");
        break;
      default:
        break;
    }

    i18n.changeLanguage(selectedLanguage);
    console.log("Language: " + selectedLanguage);
  }

  return (
    <div className={menuStyles.selectContainer}>
        <select 
          value={languageSelected}
          className={menuStyles.customSelect}
          onChange={handleChange}
        >
          {LANGUAGES.map(({ code, label }) => (
          <option 
            key={code} 
            value={code}
            >
            {label}
          </option>
      ))}
    </select> 
    <div className={menuStyles.dropdownArrow}> </div>
    </div>
  );
}

export default LanguageSelector;