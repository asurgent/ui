import React, { useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import moment from 'moment';
import translation from './Heatmap.translation';
import createLegend from './Legend';
import { getColor } from './helpers';

const { t } = translation;

const sampleSize = 300;
const sample = [...Array(sampleSize)].map((el, ind) => ({
  date: new Date(moment().subtract(sampleSize - ind, 'days')),
  day: Math.floor(Math.random() * 4),
  count: Math.floor(Math.random() * 2) === 0 ? 0 : Math.floor(Math.random() * 50),
}));

sample.sort((a, b) => new Date(a.Date) - new Date(b.Date));

const propTypes = {
  steps: PropTypes.number,
  /* legendWidth: PropTypes.number, */
  color: PropTypes.string,
  emptyColor: PropTypes.string,
  theme: PropTypes.instanceOf(Object),
  cellSize: PropTypes.number,
  cellPadding: PropTypes.string,
  onDateClick: PropTypes.func,
  onCategoryClick: PropTypes.func,
};

const defaultProps = {
  steps: 5,
  /* legendWidth: 14, */
  color: null,
  emptyColor: null,
  theme: {},
  cellSize: 17,
  cellPadding: '2px',
  onDateClick: () => null,
  onCategoryClick: () => null,
};

const Heatmap = ({
  steps, color, emptyColor, cellSize, cellPadding, theme,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [dates, setDates] = useState(null);

  useEffect(() => {
    const convertedData = sample.map((dv) => ({
      date: d3.timeDay(new Date(dv.date)),
      value: dv.count,
      selected: false,
    }));
    setDates(convertedData);
  }, [setDates]);

  useEffect(() => {
    const svg = d3.select('#svg');

    function draw() {
      const values = dates.map((c) => c.value);
      const maxValue = Math.max(...values);
      const minValue = Math.min(...values);

      // g.selectAll(g) -> 2018,2019,2020 group
      const countDay = (d) => d.getUTCDay();
      const formatDate = d3.utcFormat('%x');

      const myColor = d3
        .scaleLinear()
        .domain([1, Math.ceil(maxValue)])
        .range([theme.ruby50 || 'white', color || theme.ruby800]);

      const categories = [...Array(steps)].map((_, i) => {
        const upperBound = (maxValue / steps) * (i + 1);
        const lowerBound = (maxValue / steps) * i;
        return {
          upperBound,
          lowerBound,
          color: myColor(lowerBound),
          selected: true,
        };
      });
      const group = svg.append('g');

      // Y-axis labels (days)
      const dayText = group
        .append('g')
        .attr('class', 'dayText')
        .selectAll('text')
        .data(d3.range(7).map((i) => new Date(new Date().getFullYear(), 0, i)))
        .join('text')
        .attr('y', (d) => (countDay(d) + 0.5) * cellSize)
        .attr('dy', '0.31em')
        .attr('font-size', 12)
        .text((d) => t(`day${new Date(d).getUTCDay()}`));

      // create a tooltip
      const tooltip = d3.select('#tooltip')
        .style('opacity', 1)
        .attr('class', 'tooltip')
        .style('background-color', 'white')
        .style('border', 'solid')
        .style('position', 'absolute')
        .style('border-width', '2px')
        .style('border-radius', '5px')
        .style('padding', '5px');

      const mouseover = () => {
        tooltip.style('opacity', 1);
      };
      const mousemove = ({ date, value }) => {
        const { x, y } = d3.event;
        tooltip
          .html(`${moment(date).format('YYYY-MM-DD')}<br>Value: ${value}`)
          .style('left', `${x + 20}px`)
          .style('top', `${y}px`);
      };
      const mouseleave = () => {
        tooltip.style('opacity', 0);
      };

      const squares = group
        .append('g')
        .attr('class', 'squares')
        .selectAll('rect')
        .data(dates)
        .join('rect')
        .attr('width', cellSize - 3)
        .attr('height', cellSize - 3)
        .attr(
          'x',
          (d) => {
            const currentYear = d3.utcYear(d.date);
            const week = d3.utcSunday.count(currentYear, d.date);
            return week * cellSize + 10;
          },
        )
        .attr('y', (d) => new Date(d.date).getUTCDay() * cellSize + 0.5)
        .attr('fill', (d) => getColor(d.value, emptyColor || theme.gray100, categories))
        .attr('rx', cellPadding)
        .attr('ry', cellPadding)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseleave', mouseleave)
        .append('title')
        .text((d) => `${formatDate(d.date)}: ${d.value === null ? 'no data' : d.value}`);

      // .on('click', toggleSpecificDate)

      createLegend({
        group, dates, squares, cellSize, categories, cellPadding, emptyColor, theme,
      });

      const { width, height } = svg
        .select('g').node().getBoundingClientRect();
      svg.attr('width', width + 80)
        .attr('height', height + 60);
    }

    if (dates?.length > 0) {
      draw();
    }

    /* cellPadding, cellSize, color, dates,
    emptyColor, steps, theme, theme.gray100, theme.ruby800 */
    /* eslint-disable-next-line */
  }, [dates]);

  return (
    <>
      <svg id="svg" />
      <div id="tooltip" />
    </>
  );
};

Heatmap.propTypes = propTypes;
Heatmap.defaultProps = defaultProps;

export default withTheme(Heatmap);
