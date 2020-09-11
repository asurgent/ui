import moment from 'moment';
import translation from './StartEnd.translation';
import { newMoment } from '../../../Moment/momentParsers';

const { t } = translation;

export const getRelativeTime = ({ date, duration }) => {
  let timestamp;

  if (duration) {
    // calculate full time window
    timestamp = newMoment().add(duration, 'seconds');
  } else {
    // calculate remaining on active
    timestamp = newMoment(date);
  }

  const difference = timestamp.diff(newMoment(), 'seconds');
  const momentDuration = moment.duration(difference, 'seconds');

  if (momentDuration.asDays() >= 1) {
    return { number: momentDuration.days(), label: t('days', 'asurgentui') };
  }
  if (momentDuration.asHours() >= 1) {
    return { number: momentDuration.hours(), label: t('hours', 'asurgentui') };
  }
  if (momentDuration.asMinutes() >= 1) {
    return { number: momentDuration.minutes(), label: t('minutes', 'asurgentui') };
  }
  if (momentDuration.asSeconds() >= 1) {
    return { number: momentDuration.seconds(), label: t('seconds', 'asurgentui') };
  }

  return {};
};
