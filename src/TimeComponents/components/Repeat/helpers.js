import translation from './Repeat.translation';

const { t } = translation;

export const getRepeatSign = (duration) => {
  if (duration > 31536000) {
    return { short: t('yearShort', 'asurgentui'), long: t('yearLong', 'asurgentui') };
  }
  if (duration > 2419200) {
    return { short: t('monthShort', 'asurgentui'), long: t('monthLong', 'asurgentui') };
  }
  if (duration > 604800) {
    return { short: t('weekShort', 'asurgentui'), long: t('weekLong', 'asurgentui') };
  }
  if (duration > 86400) {
    return { short: t('dayShort', 'asurgentui'), long: t('dayLong', 'asurgentui') };
  }
  if (duration > 3600) {
    return { short: t('hourShort', 'asurgentui'), long: t('hourLong', 'asurgentui') };
  }
  if (duration > 60) {
    return { short: t('minuteShort', 'asurgentui'), long: t('minuteLong', 'asurgentui') };
  }
  if (duration > 0) {
    return { short: t('secondShort', 'asurgentui'), long: t('secondLong', 'asurgentui') };
  }
  return { short: t('naIcon', 'asurgentui'), long: t('naText', 'asurgentui') };
};
