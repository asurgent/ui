import i18next from 'i18next';

const contract = (translation) => {
  const translationMapper = (key, namespace) => i18next.t(`${namespace ? `${namespace}:` : ''}${translation.id}_${key}`);

  return {
    translation,
    t: translationMapper,
  };
};


export default contract;
