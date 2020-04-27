
/**
 * @param  {} context - Eg. require.context('./../../src/', true, /\.translation.js/)
 * @param  {} resourceKey - Optional. Will pass resource struct
 */
const findTranslations = (context, resourceKey) => {
  const requireAll = (requireContext) => requireContext.keys().map(requireContext);
  const modules = requireAll(context);

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

  if (resourceKey) {
    return {
      en: {
        [resourceKey]: Object.assign(moduleTranslations.en),
      },
      sv: {
        [resourceKey]: Object.assign(moduleTranslations.sv),
      },
    };
  }

  return moduleTranslations;
};
export default findTranslations;
