const requireAll = (requireContext) => requireContext.keys().map(requireContext);
const modules = requireAll(require.context('./../../src/', true, /\.translation.js/));

const buildTranslation = (t, id) => Object.keys(t)
  .reduce((acc, item) => Object.assign(acc, {
    [`${id}_${item}`]: t[item],
  }), {});

const moduleTranslations = modules.reduce((acc, { default: mod }) => {
  const { translation } = mod;

  Object.assign(acc.en, buildTranslation(translation.en, translation.id));
  Object.assign(acc.sv, buildTranslation(translation.sv, translation.id));

  return acc;
}, { sv: {}, en: {} });


const translations = {
  en: {
    asurgentui: Object.assign(moduleTranslations.en),
  },
  sv: {
    asurgentui: Object.assign(moduleTranslations.sv),
  },
};

export default translations;
