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
  addMonthText, addWeekdays, isToday, getY, getX, getValueText,
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

const createSquareBlocks = (group, data, cellSize) => group
  .selectAll('rect')
  .data(data.filter(({ date }) => !isToday(date)))
  .join('rect')
  .attr('shape-rendering', 'crispedges')
  .attr('width', cellSize)
  .attr('height', cellSize);

const moveSquares = (squares, startDate, cellSize, cellGap) => {
  squares
    .attr('x', ({ date }) => getX(startDate, date, cellSize, cellGap))
    .attr('y', ({ date }) => getY(date, cellSize, cellGap));
};

// looping over all days, try to find prim, otherwise sec, otherwise null
const fillSquares = (squares, emptyColor, legendCategories) => {
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
    .style('stroke', ({ primValue, secValue }) => {
      if (primValue === undefined && secValue === undefined) {
        return '#f2f2f2';
      }
      return getColor(primValue, emptyColor, legendCategories);
    })
    .style('stroke-width', `${STROKE_WIDTH}px`)
    .style('stroke-dasharray', '100%');
};

const getPolygons = (today, cellSize) => [
  {
    color: '#133A5D',
    date: today.date,
    points: [
      { x: 0, y: 0 },
      { x: cellSize, y: 0 },
      { x: cellSize, y: cellSize },
    ],
  }, {
    date: today.date,
    secValue: today.secValue,
    primValue: today.primValue,
    points: [
      { x: 0, y: cellSize },
      { x: 0, y: 0 },
      { x: cellSize, y: cellSize },
    ],
  },
];

const placeToday = (
  mergedData,
  cellSize,
  startDate,
  cellGap,
  emptyColor,
  legendCategories,
  tooltip,
  valueLabel,
) => {
  const g = d3.select('#today');
  const today = mergedData.find(({ date }) => isToday(date));
  const { primValue, secValue, date } = today;
  const polys = getPolygons(today, cellSize);

  g.attr('transform', () => `translate(
    ${getX(startDate, today.date, cellSize, cellGap)}, 
    ${getY(today.date, cellSize, cellGap)}
  )`)
    .on('mousemove', () => mousemove({
      date, primValue, secValue, valueLabel, cellSize,
    }))
    .on('mouseover', () => mouseover(tooltip))
    .on('mouseleave', () => mouseleave(tooltip));

  g.selectAll('polygon')
    .data(polys)
    .join('polygon')
    .attr('points', ({ points }) => points.map((p) => [p.x, p.y].join(',')).join(' '))
    .attr('fill', ({ color }) => {
      if (color) {
        return color;
      }
      const colorVal = today.primValue || today.secValue;
      if (!colorVal) {
        return emptyColor;
      }

      return getColor(colorVal, emptyColor, legendCategories);
    })
    .attr('stroke-width', 4);
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

  const mergedData = [...Array(days)].map((_, index) => {
    const curDate = moment(moment(startDate).add(index, 'days')).format('YYYY-MM-DD');

    return {
      date: curDate,
      primValue: primObj[curDate],
      secValue: secObj[curDate],
    };
  });

  // Create squares
  const squares = useMemo(() => {
    if (squareGroup) {
      const noToday = mergedData.filter(({ date }) => !isToday(date));
      return createSquareBlocks(squareGroup, noToday, cellSize, cellGap);
    }
    return null;
  }, [mergedData, cellGap, cellSize, squareGroup]);

  // Place today
  useEffect(() => {
    if (squareGroup) {
      placeToday(mergedData,
        cellSize,
        startDate,
        cellGap,
        emptyColor,
        legendCategories,
        tooltip,
        valueLabel);
    }
  }, [mergedData,
    cellGap,
    cellSize,
    emptyColor,
    legendCategories,
    startDate,
    squareGroup,
    tooltip,
    valueLabel]);

  // Placement of squares
  useEffect(() => {
    if (squareGroup && squares) {
      moveSquares(squares, startDate, cellSize, cellGap);
    }
  }, [cellGap, cellSize, startDate, squareGroup, squares]);

  // Fill squares
  useEffect(() => {
    if (squareGroup && squares) {
      fillSquares(squares, emptyColor, legendCategories, cellSize);
    }
  }, [emptyColor, legendCategories, squareGroup, cellSize, squares]);

  // Move squares
  useEffect(() => {
    squares
      .on('mousemove', ({ date, primValue, secValue }) => mousemove({
        date, primValue, secValue, valueLabel, cellSize,
      }))
      .on('mouseover', () => mouseover(tooltip))
      .on('mouseleave', () => mouseleave(tooltip));
  }, [cellSize, squareGroup, squares, tooltip, valueLabel]);

  // Add weekdays
  useEffect(() => {
    if (mergedData && weekdayRef.current) {
      addWeekdays({
        ref: weekdayRef.current,
        cellSize,
        cellGap,
      });
    }
  }, [cellGap, cellSize, mergedData, primaryData]);

  // Add months
  useEffect(() => {
    if (mergedData && monthTextRef.current) {
      addMonthText({
        ref: monthTextRef.current,
        data: mergedData,
        startDate,
        cellSize,
        cellGap,
      });
    }
  }, [cellGap, cellSize, mergedData, primaryData, startDate]);

  return (
    <>
      <C.Months ref={monthTextRef} />
      <C.Weekdays ref={weekdayRef} />
      <C.Squares id="squares" ref={squareRef}>
        <g id="today" />
      </C.Squares>
    </>
  );
};

Squares.propTypes = propTypes;
Squares.defaultProps = defaultProps;

export default withTheme(Squares);
