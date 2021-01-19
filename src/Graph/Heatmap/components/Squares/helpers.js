import * as d3 from 'd3';
import moment from 'moment';
import translation from './Squares.translation';
import { marginFromWeekdays } from '../../constants';

const { t } = translation;

export const addMonthText = ({
  ref, primaryData, startDate, cellSize,
}) => {
  const monthText = d3.select(ref);
  const firsts = primaryData.filter((d) => moment(d.date).date() === 1);
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
  const todayOffset = isToday(date)
    ? cellSize * 0.5
    : cellSize;

  return (weekOffset * (cellSize + cellGap)) + marginFromWeekdays - (todayOffset / 2);
};

export const getY = (date, cellSize, cellGap) => {
  const dayRow = moment(date).isoWeekday() - 1;
  const monthTextOffset = 20;
  const todayOffset = isToday(date) ? cellSize * 0.5 : cellSize;
  return (dayRow * (cellSize + cellGap)) + monthTextOffset - (todayOffset / 2);
};
