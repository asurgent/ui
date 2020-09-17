import moment from 'moment';
import parser from 'cron-parser';
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

export const getNextNextDate = ({ nextExecution, cronExpression }) => {
  try {
    const interval = parser.parseExpression(cronExpression,
      { currentDate: newMoment(nextExecution).toISOString() });
    const d = interval.next().toString();
    return {
      from: newMoment(nextExecution),
      to: newMoment(d),
    };
  } catch (e) {
    return null;
  }
};

export const getLastRun = ({ cronExpression, end, durationInSeconds }) => {
  try {
    const interval = parser.parseExpression(cronExpression, {
      currentDate: newMoment(end).toISOString(),
    });
    const prev = newMoment(interval.prev().toString()).toISOString();
    const to = newMoment(prev).add(durationInSeconds, 'seconds').toISOString();
    return {
      from: prev,
      to,
    };
  } catch (e) {
    return null;
  }
};
