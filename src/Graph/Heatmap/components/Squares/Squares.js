import React, {
  useRef, useEffect, useState, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as d3 from 'd3';
import { withTheme } from 'styled-components';
import * as C from './Squares.styled';
import translation from './Squares.translation';
import { getColor } from '../../helpers';
import { addMonthText, addWeekdays } from './helpers';
import { marginFromWeekdays } from '../../constants';

const { t } = translation;

const propTypes = {
  primaryData: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  secondaryData: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  valueLabel: PropTypes.string,
  cellSize: PropTypes.number,
  cellPadding: PropTypes.number,
  cellRadius: PropTypes.number,
  emptyColor: PropTypes.string,
  legendCategories: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  startDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
};

const defaultProps = {
  primaryData: [],
  secondaryData: [],
  valueLabel: 'value',
  cellSize: 18,
  cellPadding: 2,
  cellRadius: 1,
  emptyColor: '#F2F2F2',
  legendCategories: null,
  startDate: moment().startOf('year'),
};

const createSquareBlocks = (group, primaryData, cellSize, cellPadding) => group
  .selectAll('rect')
  .data(primaryData)
  .join('rect')
  .attr('width', cellSize - cellPadding)
  .attr('height', cellSize - cellPadding);

const moveSquares = (squares, startDate, cellSize, cellPadding) => {
  squares
    .attr(
      'x',
      (d) => {
        const firstDate = startDate ? moment(startDate) : moment(d.date).startOf('year');
        const week = d3.utcSunday.count(firstDate, d.date);
        return (week * cellSize) + cellPadding + marginFromWeekdays;
      },
    )
    .attr('y', (d) => {
      const dayRow = moment(d.date).isoWeekday() - 1;
      return dayRow * cellSize + 20;
    });
};

const addRadiusToSquares = (squares, cellRadius) => {
  squares.attr('rx', cellRadius)
    .attr('ry', cellRadius);
};

const fillSquares = (squares, emptyColor, legendCategories) => {
  squares
    .attr('fill', (d) => getColor(d.value, emptyColor, legendCategories))
    .transition()
    .duration(500);
};

const mouseover = (tooltip) => tooltip.style('opacity', 1);
const mouseleave = (tooltip) => tooltip.style('opacity', 0);
const mousemove = ({
  date, value, valueLabel, cellSize,
}) => {
  const tooltip = d3.select('#tooltip');
  const { x, y } = d3.event;
  const { width, height } = tooltip.node().getBoundingClientRect();
  const valueText = value === null ? t('noData', 'asurgentui') : `${value} ${valueLabel}`;
  tooltip
    .html(`${valueText} ${t('on', 'asurgentui')} ${moment(date).format('YYYY-MM-DD')}`)
    .style('left', `${x - (width / 2)}px`)
    .style('top', `${y - (height + cellSize)}px`);
};

const Squares = ({
  primaryData,
  secondaryData,
  startDate,
  valueLabel,
  cellSize,
  cellPadding,
  cellRadius,
  emptyColor,
  legendCategories,
}) => {
  const squareRef = useRef(null);
  const monthTextRef = useRef(null);
  const weekdayRef = useRef(null);

  const tooltip = d3.select('#tooltip');
  const squareGroup = d3.select(squareRef.current);

  const squares = useMemo(() => {
    if (squareGroup) {
      return createSquareBlocks(
        squareGroup,
        primaryData,
        cellSize,
        cellPadding,
      );
    }
    return null;
  }, [cellPadding, cellSize, primaryData, squareGroup]);

  // Placement of squares
  useEffect(() => {
    if (squareGroup) {
      moveSquares(squares, startDate, cellSize, cellPadding);
    }
  }, [cellPadding, cellSize, squareGroup, squares, startDate]);

  // Add radius to squares
  useEffect(() => {
    if (squareGroup) {
      addRadiusToSquares(squares, cellRadius);
    }
  }, [cellRadius, squareGroup, squares]);

  // Fill squares
  useEffect(() => {
    if (squareGroup) {
      fillSquares(squares, emptyColor, legendCategories);
    }
  }, [emptyColor, legendCategories, squareGroup, squares]);

  // Add weekdays
  useEffect(() => {
    if (primaryData && monthTextRef.current) {
      if (weekdayRef.current) {
        addWeekdays({
          ref: weekdayRef.current,
          cellSize,
        });
      }
    }
  }, [cellSize, primaryData]);

  // Add months
  useEffect(() => {
    if (primaryData && monthTextRef.current) {
      addMonthText({
        ref: monthTextRef.current,
        primaryData,
        startDate,
        cellSize,
      });
    }
  }, [cellSize, primaryData, startDate]);

  return (
    <>
      <C.Months ref={monthTextRef} />
      <C.Weekdays ref={weekdayRef} />
      <C.Squares id="squares" ref={squareRef} />
    </>
  );
};

Squares.propTypes = propTypes;
Squares.defaultProps = defaultProps;

export default withTheme(Squares);
