import * as d3 from 'd3';
import translation from './Axis.translation';

const { t } = translation;

const locale = d3.timeFormatLocale({
  dateTime: '%a %b %e %X %Y',
  date: '%d.%m.%Y',
  time: '%HH:%M:%S',
  periods: [],
  days: [
    t('monday', 'asurgentui'),
    t('tuesday', 'asurgentui'),
    t('wednesday', 'asurgentui'),
    t('thursday', 'asurgentui'),
    t('friday', 'asurgentui'),
    t('saturday', 'asurgentui'),
    t('sunday', 'asurgentui'),
  ],
  shortDays: [
    t('mon', 'asurgentui'),
    t('tue', 'asurgentui'),
    t('wed', 'asurgentui'),
    t('thu', 'asurgentui'),
    t('fri', 'asurgentui'),
    t('sat', 'asurgentui'),
    t('sun', 'asurgentui'),
  ],
  months:
  [
    t('januany', 'asurgentui'),
    t('feburary', 'asurgentui'),
    t('march', 'asurgentui'),
    t('april', 'asurgentui'),
    t('may', 'asurgentui'),
    t('june', 'asurgentui'),
    t('july', 'asurgentui'),
    t('august', 'asurgentui'),
    t('september', 'asurgentui'),
    t('october', 'asurgentui'),
    t('november', 'asurgentui'),
    t('december', 'asurgentui'),
  ],
  shortMonths:
  [
    t('jan', 'asurgentui'),
    t('feb', 'asurgentui'),
    t('mar', 'asurgentui'),
    t('apr', 'asurgentui'),
    t('may', 'asurgentui'),
    t('jun', 'asurgentui'),
    t('jul', 'asurgentui'),
    t('aug', 'asurgentui'),
    t('sep', 'asurgentui'),
    t('oct', 'asurgentui'),
    t('nov', 'asurgentui'),
    t('dec', 'asurgentui'),
  ],
});


const formatHour = locale.format('%I:%M');

const formatDay = locale.format('%a %d');
const formatWeek = locale.format('%b %d');
const formatMonth = locale.format('%B');
const formatYear = locale.format('%Y');

export const customTick = (date) => {
  if (d3.timeDay(date) < date) {
    return formatHour(date);
  } if (d3.timeMonth(date) < date) {
    if (d3.timeWeek(date) < date) {
      return formatDay(date);
    }
    return formatWeek(date);
  } if (d3.timeYear(date) < date) {
    return formatMonth(date);
  }
  return formatYear(date);
};
