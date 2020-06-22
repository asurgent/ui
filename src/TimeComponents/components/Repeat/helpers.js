import moment from 'moment';
import translation from './Repeat.translation';

const { t } = translation;

export const getRepeatInterval = (duration) => {
  const momentDuration = moment.duration(duration, 'seconds');
  if (momentDuration.years()) {
    return { short: t('yearShort', 'asurgentui'), long: t('yearLong', 'asurgentui') };
  }
  if (momentDuration.months()) {
    return { short: t('monthShort', 'asurgentui'), long: t('monthLong', 'asurgentui') };
  }
  if (momentDuration.weeks()) {
    return { short: t('weekShort', 'asurgentui'), long: t('weekLong', 'asurgentui') };
  }
  if (momentDuration.days()) {
    return { short: t('dayShort', 'asurgentui'), long: t('dayLong', 'asurgentui') };
  }
  if (momentDuration.hours()) {
    return { short: t('hourShort', 'asurgentui'), long: t('hourLong', 'asurgentui') };
  }
  if (momentDuration.minutes()) {
    return { short: t('minuteShort', 'asurgentui'), long: t('minuteLong', 'asurgentui') };
  }
  if (momentDuration.seconds()) {
    return { short: t('secondShort', 'asurgentui'), long: t('secondLong', 'asurgentui') };
  }
  return { short: t('naIcon', 'asurgentui'), long: t('naText', 'asurgentui') };
};
