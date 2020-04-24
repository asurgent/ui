import i18next from 'i18next';
import addTranslation from './addTranslation';
import findTranslations from './findTranslations';

/**
 * Find and build all our translations
 */
const context = require.context('./../../src/', true, /\.translation.js/);
const resources = findTranslations(context, 'asurgentui');

/**
 * Run after i18n has been initated
 */
const addComponentTranslations = () => {
  i18next.addResourceBundle('sv', 'asurgentui', resources.sv.asurgentui);
  i18next.addResourceBundle('en', 'asurgentui', resources.en.asurgentui);
};


export {
  i18next,
  resources,
  addTranslation,
  findTranslations,
  addComponentTranslations,
};
