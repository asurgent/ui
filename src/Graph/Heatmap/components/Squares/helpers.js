import * as d3 from 'd3';
import moment from 'moment';
import translation from './Squares.translation';
import { marginFromWeekdays } from '../../constants';

const { t } = translation;

export const addMonthText = ({
  ref, data, startDate, cellSize,
}) => {
  const monthText = d3.select(ref);
  const firsts = data.filter((d) => moment(d.date).date() === 1);
  monthText
    .selectAll('text')
    .data(firsts)
    .join('text')
    .text((d) => t(`month${moment(d.date).month()}`, 'asurgentui'))
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'hanging')
    .attr('x', ({ date }) => {
      const currentYear = startDate ? moment(startDate) : moment(date).startOf('year');
      const week = d3.utcSunday.count(currentYear, date);
      const x = (week * cellSize) + 47;
      return x;
    });
};

export const addWeekdays = ({ ref, cellSize, cellGap }) => {
  const dayText = d3.select(ref);
  dayText
    .selectAll('text')
    .data(d3.range(7).map((i) => new Date(new Date().getFullYear(), 0, i)))
    .join('text')
    .attr('y', (d) => (d.getUTCDay() + 0.5) * cellSize + cellGap)
    .attr('dy', '0.31em')
    .text((d) => t(`day${new Date(d).getUTCDay()}`, 'asurgentui'));
};

export const isToday = (date) => moment(date).isSame(moment().format('YYYY-MM-DD'));

export const getX = (startDate, date, cellSize, cellGap) => {
  const firstDate = startDate
    ? moment(startDate)
    : moment(date).startOf('year');
  const weekOffset = d3
    .utcSunday
    .count(moment(firstDate), moment(date));

  return (weekOffset * (cellSize + cellGap)) + marginFromWeekdays;
};

export const getY = (date, cellSize, cellGap) => {
  const dayRow = moment(date).isoWeekday() - 1;
  const monthTextOffset = 20;
  return (dayRow * (cellSize + cellGap)) + monthTextOffset;
};

export const getValueText = ({ val1, val2, valueLabel }) => {
  if (val1 === undefined && val2 === undefined) {
    return t('noData', 'asurgentui');
  }
  if (val1 !== undefined && val2 !== undefined) {
    return `${val1} ${valueLabel} of ${val1 + val2}`;
  }
  if (val1 !== undefined) {
    return `${val1} ${valueLabel}`;
  }
  return `${val2} ${valueLabel}`;
};
