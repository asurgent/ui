import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import Normalize from '../lib/style/Normalize.styled';
import theme from '../lib/style/theme'
import { I18nextProvider,initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources }  from '../lib/i18n';
import i18n from 'i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
      resources,
      lng: 'sv',
      fallbackLng: 'sv',
      defaultNS: 'asurgentui',
      whitelist: ['en', 'sv'],
      interpolation: {
        escapeValue: false,
      },
    });


export const decorators = [
  (Story) => (

    <BrowserRouter> 
      <Normalize />
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </I18nextProvider>
    </BrowserRouter> 
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }
}