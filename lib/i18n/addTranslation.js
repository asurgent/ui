import i18next from 'i18next';

const contract = (translation) => {
  const keyBuilder = (key, namespace) => `${namespace ? `${namespace}:` : ''}${translation.id}${key}`;

  const translationMapper = (key, namespace) => i18next.t(keyBuilder(key, namespace));
  const translationExistsMapper = (key, namespace) => i18next.exists(keyBuilder(key, namespace));
  const translationFallbackMapper = (key, fallback, namespace) => {
    if (translationExistsMapper(key, namespace)) {
      return translationMapper(key, namespace);
    }
    return fallback;
  };

  return {
    translation,
    t: translationMapper,
    exists: translationExistsMapper,
    fallback: translationFallbackMapper,
  };
};

export default contract;
