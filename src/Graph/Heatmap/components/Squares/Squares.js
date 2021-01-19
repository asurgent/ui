import React, {
  useRef, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as d3 from 'd3';
import { withTheme } from 'styled-components';
import * as C from './Squares.styled';
import translation from './Squares.translation';
import { getColor } from '../../helpers';
import {
  addMonthText, addWeekdays, isToday, getY, getX,
} from './helpers';

const STROKE_WIDTH = 2;

const { t } = translation;

const propTypes = {
  primaryData: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  secondaryData: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  valueLabel: PropTypes.string,
  cellSize: PropTypes.number,
  cellGap: PropTypes.number,
  emptyColor: PropTypes.string,
  legendCategories: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  startDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  endDate: PropTypes.oneOfType([
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
  cellGap: 2,
  emptyColor: '#F2F2F2',
  legendCategories: null,
  startDate: moment().startOf('year'),
  endDate: moment().endOf('year'),
};

const createSquareBlocks = (group, data, cellSize) => group
  .selectAll('rect')
  .data(data)
  .join('rect')
  .attr('shape-rendering', 'crispedges')
  .attr('width', ({ date }) => (isToday(date) ? cellSize * 0.5 : cellSize))
  .attr('height', ({ date }) => (isToday(date) ? cellSize * 0.5 : cellSize));

const moveSquares = (squares, startDate, cellSize, cellGap) => {
  squares
    .attr('x', ({ date }) => getX(startDate, date, cellSize, cellGap))
    .attr('y', ({ date }) => getY(date, cellSize, cellGap))
    .attr('id', ({ date }) => (isToday(date) ? 'today' : ''));
};

// looping over all days, try to find prim, otherwise sec, otherwise null
const fillSquares = (squares, emptyColor, legendCategories, cellSize) => {
  squares
    .attr('fill', ({ primValue, secValue }) => {
      if (primValue) {
        return getColor(primValue, emptyColor, legendCategories);
      }
      if (secValue) {
        return '#F2F2F2';
      }
      return '#fff';
    })
    .style('stroke', ({ date, primValue, secValue }) => {
      if (isToday(date)) {
        return 'none';
      }
      if (primValue === undefined && secValue === undefined) {
        return '#f2f2f2';
      }
      return getColor(primValue, emptyColor, legendCategories);
    })
    .style('stroke-width', `${STROKE_WIDTH}px`)
    .style('stroke-dasharray', '100%')
    .style('outline', ({ date }) => (isToday(date) ? '2px solid black' : 'none'))
    .style('outline-offset', ({ date }) => (isToday(date) ? `${(cellSize * 0.25) - 1}px` : '0'));
};

const getValueText = ({ val1, val2, valueLabel }) => {
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

const mouseover = (tooltip) => tooltip.style('opacity', 1);
const mouseleave = (tooltip) => tooltip.style('opacity', 0);
const mousemove = ({
  date, primValue, secValue, valueLabel, cellSize,
}) => {
  const tooltip = d3.select('#tooltip');
  const { x, y } = d3.event;
  const { width, height } = tooltip.node().getBoundingClientRect();
  const valueText = getValueText({ val1: primValue, val2: secValue, valueLabel });

  tooltip
    .html(`${valueText} ${t('on', 'asurgentui')} ${moment(date).format('YYYY-MM-DD')}`)
    .style('left', `${x - (width / 2)}px`)
    .style('top', `${y - (height + cellSize)}px`);
};

const Squares = ({
  primaryData,
  secondaryData,
  startDate,
  endDate,
  valueLabel,
  cellSize,
  cellGap,
  emptyColor,
  legendCategories,
}) => {
  const squareRef = useRef(null);
  const monthTextRef = useRef(null);
  const weekdayRef = useRef(null);

  const tooltip = d3.select('#tooltip');
  const squareGroup = d3.select(squareRef.current);

  const days = useMemo(() => moment(endDate).diff(moment(startDate), 'days') + 1, [endDate, startDate]);
  const reduceToObject = (arr) => arr.reduce((acc, cur) => ({ ...acc, [cur.date]: cur.value }), {});

  const primObj = useMemo(() => reduceToObject(primaryData), [primaryData]);
  const secObj = useMemo(() => reduceToObject(secondaryData), [secondaryData]);

  const allSquares = [...Array(days)].map((_, index) => {
    const curDate = moment(moment(startDate).add(index, 'days')).format('YYYY-MM-DD');

    return {
      date: curDate,
      primValue: primObj[curDate],
      secValue: secObj[curDate],
    };
  });

  // TODO: move text groups to separate components
  // Add weekdays
  useEffect(() => {
    if (primaryData && weekdayRef.current) {
      addWeekdays({
        ref: weekdayRef.current,
        cellSize,
        cellGap,
      });
    }
  }, [cellGap, cellSize, primaryData]);

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

  const squares = useMemo(() => {
    if (squareGroup) {
      const blocks = createSquareBlocks(
        squareGroup,
        allSquares,
        cellSize,
        cellGap,
      );

      return blocks;
    }
    return null;
  }, [allSquares, cellGap, cellSize, squareGroup]);

  // Placement of squares
  useEffect(() => {
    if (squareGroup && squares) {
      moveSquares(squares, startDate, cellSize, cellGap);
    }
  }, [cellGap, cellSize, startDate, squareGroup, squares]);

  // Fill squares
  useEffect(() => {
    if (squareGroup) {
      fillSquares(squares, emptyColor, legendCategories, cellSize);
    }
  }, [squares, emptyColor, legendCategories, squareGroup, cellSize]);

  useEffect(() => {
    squares
      .on('mousemove', ({ date, primValue, secValue }) => mousemove({
        date, primValue, secValue, valueLabel, cellSize,
      }))
      .on('mouseover', () => mouseover(tooltip))
      .on('mouseleave', () => mouseleave(tooltip));
  }, [cellSize, squareGroup, squares, tooltip, valueLabel]);

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
