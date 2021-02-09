import * as d3 from 'd3';
import moment from 'moment';
import translation from './Squares.translation';

const { t } = translation;

export const isToday = (date) => moment(date).isSame(moment().format('YYYY-MM-DD'));

export const getX = (startDate, date, cellSize, cellGap) => {
  const firstDate = startDate
    ? moment(startDate)
    : moment(date).startOf('year');
  const weekOffset = d3
    .utcSunday
    .count(moment(firstDate), moment(date));

  const x = (weekOffset * (cellSize + cellGap));
  return x;
};

export const getY = (date, cellSize, cellGap) => {
  const dayRow = moment(date).isoWeekday() - 1;
  const y = (dayRow * (cellSize + cellGap));
  return y;
};

const nullOrUndefined = (val) => val === undefined || val === null;

export const getValueText = ({
  val1, val2, primaryLabel, secondaryLabel,
}) => {
  if (nullOrUndefined(val1) && nullOrUndefined(val2)) {
    return t('noData', 'asurgentui');
  }
  if (!nullOrUndefined(val1) && !nullOrUndefined(val2)) {
    return `${val1} ${primaryLabel} ${t('of', 'asurgentui')} ${val1 + val2}`;
  }
  if (!nullOrUndefined(val1)) {
    return `${val1} ${primaryLabel}`;
  }
  return `${val2} ${secondaryLabel}`;
};

export const addMonthText = ({
  ref, data, startDate, cellSize, cellGap, weekdayOffset,
}) => {
  const monthText = d3.select(ref);
  const firstDaysOfMonths = data.filter((d) => moment(d.date).date() === 1);
  monthText
    .selectAll('text')
    .data(firstDaysOfMonths)
    .join('text')
    .text((d) => t(`month${moment(d.date).month()}`, 'asurgentui'))
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'hanging')
    .attr('x', ({ date }) => {
      const centerOfSquareOffset = (cellSize / 2);
      return getX(startDate, date, cellSize, cellGap) + centerOfSquareOffset + weekdayOffset;
    });
};

export const addWeekdays = ({
  ref, cellSize, cellGap,
}) => {
  const dayText = d3.select(ref);
  dayText
    .selectAll('text')
    .data(d3.range(7).map((i) => new Date(new Date().getFullYear(), 0, i)))
    .join('text')
    .attr('y', (d) => {
      const squareOffset = cellSize + cellGap;
      const day = d.getUTCDay();
      return day * squareOffset + (squareOffset / 2);
    })
    .text((d) => t(`day${new Date(d).getUTCDay()}`, 'asurgentui'));
};
