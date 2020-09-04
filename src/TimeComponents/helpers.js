import moment from 'moment';
import translation from './TimeComponents.translation';

const { t } = translation;

export const getMonthYear = (occasion) => {
  const monthNumber = moment(occasion).get('months');
  const month = t(`month${monthNumber}`, 'asurgentui');
  return `${month} ${moment(occasion).format('YY')}`;
};

export const getDay = (occasion) => {
  const dayNumber = moment(occasion).get('days');
  return t(`day${dayNumber}`, 'asurgentui');
};
