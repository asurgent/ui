import moment from 'moment';
import translation from './Duration.translation';

const { t } = translation;

export const getTimestamp = (durationInSeconds, previousOccasion, isRunning) => {
  const prevEnd = moment(previousOccasion).add(durationInSeconds, 'seconds');
  const diffToPrev = moment.duration(prevEnd.diff(moment()));

  const duration = isRunning ? diffToPrev : moment.duration(durationInSeconds, 's');

  if (duration.asMinutes() < 1) {
    return { value: duration.seconds(), label: t('seconds', 'asurgentui') };
  }
  if (duration.asHours() < 1) {
    const hasSeconds = duration.seconds() !== 0;
    const value = hasSeconds
      ? `${duration.minutes()}${t('minutesShort', 'asurgentui')}${duration.seconds()}`
      : duration.minutes();
    const label = hasSeconds ? t('seconds', 'asurgentui') : t('minutes', 'asurgentui');

    return { value, label };
  }
  if (duration.asDays() < 1) {
    const hasMinutes = duration.minutes() !== 0;
    const value = hasMinutes
      ? `${duration.hours()}${t('hoursShort', 'asurgentui')}${duration.minutes()}`
      : duration.hours();
    const label = hasMinutes ? t('minutes', 'asurgentui') : t('hours', 'asurgentui');

    return { value, label };
  }
  return { value: duration.days(), label: t('days', 'asurgentui') };
};
