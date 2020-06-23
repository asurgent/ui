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

// To get rid of Deprecation warning: value provided is not in a recognized RFC2822 or ISO format.
// when using moment("not iso-formatted input"), shows up in storybook + tests
export const parseMoment = (d) => {
  try {
    return moment(new Date(d));
  } catch (e) {
    return null;
  }
};
