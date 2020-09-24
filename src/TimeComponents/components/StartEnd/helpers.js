import parser from 'cron-parser';
import moment from 'moment';
import { newMoment } from '../../../Moment/momentParsers';

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

export const formatTextNumber = (durationInSeconds) => {
  const durationHumanized = moment.duration(durationInSeconds, 'seconds').humanize();
  const formattedDuration = durationHumanized
    .split(' ')
    .map((el) => {
      const numbersInText = ['en', 'ett', 'one', 'a', 'an'];
      return numbersInText.includes(el) ? '1' : el;
    });

  return formattedDuration;
};
