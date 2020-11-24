import React, { useEffect, useState, useMemo } from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import moment from 'moment';
import translation from './Heatmap.translation';
import createLegend from './Legend';
import { getColor } from './helpers';
import * as C from './Heatmap.styled';

const { t } = translation;

const sampleSize = 300;
const sample = [...Array(sampleSize)].map((_, ind) => ({
  date: new Date(moment().subtract(sampleSize - ind, 'days')),
  day: Math.floor(Math.random() * 4),
  count: Math.floor(Math.random() * 2) === 0 ? 0 : Math.floor(Math.random() * 50),
}));

sample.sort((a, b) => new Date(a.Date) - new Date(b.Date));

const propTypes = {
  steps: PropTypes.number,
  color: PropTypes.string,
  emptyColor: PropTypes.string,
  theme: PropTypes.instanceOf(Object),
  cellSize: PropTypes.number,
  cellPadding: PropTypes.number,
  cellRadius: PropTypes.number,
  valueLabel: PropTypes.string,
  onDateClick: PropTypes.func,
};

const defaultProps = {
  steps: 5,
  color: null,
  emptyColor: null,
  theme: {},
  cellSize: 18,
  cellRadius: 1,
  cellPadding: 2,
  valueLabel: 'something',
  onDateClick: () => null,
};

const Heatmap = ({
  steps, color, emptyColor, cellSize, cellRadius, cellPadding, valueLabel, onDateClick, theme,
}) => {
  const [dates, setDates] = useState(null);

  const values = useMemo(() => {
    if (dates?.length > 0) {
      return dates.map((c) => c.value);
    }
    return null;
  }, [dates]);
  const maxValue = useMemo(() => {
    if (values) {
      return Math.max(...values);
    }
    return null;
  }, [values]);

  const myColor = d3
    .scaleLinear()
    .domain([1, Math.ceil(maxValue)])
    .range([theme.ruby50 || 'white', color || theme.ruby800]);

  const legendCategories = useMemo(() => [...Array(steps)].map((_, i) => {
    const upperBound = (maxValue / steps) * (i + 1);
    const lowerBound = (maxValue / steps) * i;
    return {
      upperBound,
      lowerBound,
      color: myColor(lowerBound),
      selected: true,
    };
  }), [maxValue, myColor, steps]);

  useEffect(() => {
    const convertedData = sample.map((dv) => ({
      date: d3.timeDay(new Date(dv.date)),
      value: dv.count,
      selected: true,
    }));
    setDates(convertedData);
  }, [setDates]);

  useEffect(() => {
    const svg = d3.select('#svg');
    svg.selectAll('*').remove();

    function draw() {
      // g.selectAll(g) -> 2018,2019,2020 group
      const countDay = (d) => d.getUTCDay();
      const formatDate = d3.utcFormat('%x');

      const svgGroup = svg.append('g').style('user-select', 'none');

      // Y-axis labels (days)
      const dayText = svgGroup
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
      const tooltip = d3.select('#tooltip');

      const mouseover = () => tooltip.style('opacity', 1);
      const mouseleave = () => tooltip.style('opacity', 0);
      const mousemove = ({ date, value }) => {
        const { x, y } = d3.event;
        const { width, height } = tooltip.node().getBoundingClientRect();

        tooltip
          .html(`${value} ${valueLabel} ${t('on', 'asurgentui')} ${moment(date).format('YYYY-MM-DD')}`)
          .style('left', `${x - (width / 2)}px`)
          .style('top', `${y - (height + cellSize)}px`);
      };

      function toggleSelected(d) {
        const highlightedDates = dates.map((date) => {
          if (date.date === d.date) {
            const toggledDate = { ...date, selected: !d.selected };
            return toggledDate;
          }
          return date;
        });
        setDates(highlightedDates);
      }

      const squareGroup = svgGroup
        .append('g')
        .attr('class', 'squares');

      const squares = squareGroup
        .selectAll('rect')
        .data(dates)
        .join('rect')
        .on('mousemove', mousemove)
        .on('mouseover', mouseover)
        .on('mouseleave', mouseleave)
        .on('click', (d) => {
          onDateClick(d);
          toggleSelected(d);
        });
      squares
        .attr('width', cellSize - cellPadding)
        .attr('height', cellSize - cellPadding)
        .attr(
          'x',
          (d) => {
            const currentYear = d3.utcYear(d.date);
            const week = d3.utcSunday.count(currentYear, d.date);
            return week * cellSize + 10;
          },
        )
        .attr('y', (d) => new Date(d.date).getUTCDay() * cellSize)
        .attr('rx', cellRadius)
        .attr('ry', cellRadius)
        .style('cursor', 'pointer')
        .attr('fill', (d) => {
          const test = dates.find(({ date }) => date === d.date);

          if (test.selected === false) {
            return emptyColor;
          }
          return getColor(d.value, emptyColor || theme.gray100, legendCategories);
        })
        .transition()
        .duration(500);

      /*   squares.on('mousemove', mousemove)
         */
      /*
           .on('mousemove', mousemove)
        .on('mouseover', mouseover)
        .on('mouseleave', mouseleave)

        .on('click', (d) => {
          onDateClick(d);
          toggleSelected(d);
        })
        */

      // .on('click', toggleSpecificDate)

      createLegend({
        svgGroup, legendCategories, cellSize, cellPadding, cellRadius,
      });

      const { width, height } = svg
        .select('g').node().getBoundingClientRect();
      svg.attr('width', width)
        .attr('height', height);
    }

    if (dates && legendCategories) {
      draw();
    }
  }, [dates,
    color,
    legendCategories,
    values, cellSize,
    cellPadding,
    cellRadius,
    emptyColor,
    theme,
    onDateClick,
    maxValue,
    valueLabel]);

  return (
    <C.Container>
      <svg id="svg" />
      <C.Tooltip id="tooltip" />
    </C.Container>
  );
};

Heatmap.propTypes = propTypes;
Heatmap.defaultProps = defaultProps;

export default withTheme(Heatmap);
