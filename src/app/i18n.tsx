import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Sentry from 'sentry-expo';
import jsonEn from '../locales/en/translation.json';
import jsonPl from '../locales/pl/translation.json';

declare global {
  interface Window {
    __DEV__: boolean;
  }
}

window.__DEV__ = process.env.NODE_ENV !== 'production';

Sentry.init({
  dsn: 'https://...',
  enableInExpoDevelopment: true,
  debug: true,
  tracesSampleRate: 1.0,
});

const resources = {
  en: {
    translation: jsonEn, 
  },
  pl: {
    translation: jsonPl,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en', 
    saveMissing: true, 
    interpolation: {
      escapeValue: false, 
    },
  });

  export default i18n;
