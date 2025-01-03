import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationDE from "./deutsch/translation.json"
import translationEN from "./englisch/translation.json"

i18n.use(initReactI18next).init({
    lng: "de",
    fallbackLng: "de",
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: {
            translation: translationEN,
        },
        de: {
            translation: translationDE
        }
    },
});

export default i18n;
