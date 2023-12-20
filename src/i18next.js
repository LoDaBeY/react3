import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN from '../src/comp/Language/EN.json';
import AR from '../src/comp/Language/AR.json';
import TR from '../src/comp/Language/TR.json';
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  EN: {
    translation: EN
  },
  AR: {
    translation: AR
    
  },

  TR: {
    translation: TR
    
  }
};

i18n.use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    detection: {
      order: [ 'localStorage', 'sessionStorage',  'htmlTag'],
      caches: ['localStorage'],

    },

    react: {
      useSuspense: false
    }
  });

  export default i18n;