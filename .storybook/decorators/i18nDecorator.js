import React from "react"
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { resources }  from './../../lib/i18n'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
      resources,
      lng: 'sv',
      fallbackLng: 'sv',
      whitelist: ['en', 'sv'],
      interpolation: {
        escapeValue: false,
      },
    });
 

const I18nDecorator = storyFn => (
  <I18nextProvider i18n={i18n}>
    {storyFn()}
  </I18nextProvider>
)

export default I18nDecorator