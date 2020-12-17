import * as d3 from 'd3';
import moment from 'moment';
import translation from './Squares.translation';

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

export const addWeekdays = ({ ref, cellSize }) => {
  const dayText = d3.select(ref);
  dayText
    .selectAll('text')
    .data(d3.range(7).map((i) => new Date(new Date().getFullYear(), 0, i)))
    .join('text')
    .attr('y', (d) => (d.getUTCDay() + 0.5) * cellSize + 20)
    .attr('dy', '0.31em')
    .text((d) => t(`day${new Date(d).getUTCDay()}`, 'asurgentui'));
};
