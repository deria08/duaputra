import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    id: {
      translation: {
        hello: "Halo Dunia",
      },
    },
    en: {
      translation: {
        hello: "Hello World",
      },
    },
  },
  lng: "id",
  fallbackLng: "id",
  interpolation: { escapeValue: false },
});

export default i18n;
