import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as d3 from 'd3';
import { withTheme } from 'styled-components';
import * as C from './Squares.styled';
import translation from './Squares.translation';
import { getColor } from '../../helpers';

const { t } = translation;

const propTypes = {
  dates: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  setDates: PropTypes.func,
  valueLabel: PropTypes.string,
  onDateClick: PropTypes.func,
  cellSize: PropTypes.number,
  cellPadding: PropTypes.number,
  cellRadius: PropTypes.number,
  emptyColor: PropTypes.string,
  legendCategories: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  theme: PropTypes.instanceOf(Object),
};
const defaultProps = {
  dates: null,
  setDates: () => null,
  valueLabel: 'value',
  onDateClick: () => null,
  cellSize: 18,
  cellPadding: 2,
  cellRadius: 1,
  emptyColor: '#dadada',
  legendCategories: null,
  theme: {},
};

const Squares = ({
  dates,
  setDates,
  valueLabel,
  onDateClick,
  cellSize,
  cellPadding,
  cellRadius,
  emptyColor,
  legendCategories,
  theme,
}) => {
  const squareRef = useRef(null);

  useEffect(() => {
    if (squareRef.current) {
      const toggleSelected = (d) => {
        const highlightedDates = dates.map((date) => {
          if (date.date === d.date) {
            const toggledDate = { ...date, selected: !d.selected };
            return toggledDate;
          }
          return date;
        });
        setDates(highlightedDates);
      };

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

      const squareGroup = d3.select('#squares');
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
        .attr('fill', (d) => {
          const test = dates.find(({ date }) => date === d.date);

          if (test.selected === false) {
            return emptyColor;
          }
          return getColor(d.value, emptyColor || theme.gray100, legendCategories);
        })
        .transition()
        .duration(500);
    }
  }, [
    cellPadding,
    cellRadius,
    cellSize,
    dates,
    emptyColor,
    legendCategories,
    onDateClick,
    setDates,
    theme.gray100,
    valueLabel]);

  return (<C.Squares id="squares" ref={squareRef} />);
};

Squares.propTypes = propTypes;
Squares.defaultProps = defaultProps;

export default withTheme(Squares);
