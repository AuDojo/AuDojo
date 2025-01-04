import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    lng: "de",
    fallbackLng: "de",
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
    ns: ['footer', 'header', 'home', 'sortsensei-tutorial', 'sortsensei', 'treetutor', 'treetutor-tutorial'],
    backend: {
        loadPath:"/{{lng}}/{{ns}}.json"
    }

});

export default i18n;
