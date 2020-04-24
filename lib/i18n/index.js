import i18next from 'i18next';
import addTranslation from './addTranslation';
import resources from './translationResources';

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
  addComponentTranslations,
};
