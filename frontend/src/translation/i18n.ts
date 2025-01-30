import i18n from "i18next";
import LanguageDetector, { DetectorOptions } from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const detectionOptions: DetectorOptions = {
  order: ["localStorage", "navigator"],
  caches: ["localStorage"],
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: detectionOptions,
    fallbackLng: "de",
    interpolation: {
      escapeValue: false,
    },

    defaultNS: "home",

    backend: {
      loadPath: "translation/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
