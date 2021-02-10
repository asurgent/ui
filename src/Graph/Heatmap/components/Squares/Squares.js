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
import { STROKE_WIDTH, WEEKDAYS_WIDTH, MONTHS_HEIGHT } from '../../Constants';
import {
  addMonthText, addWeekdays, isToday, getY, getX, getValueText,
} from './helpers';

const { t } = translation;

const propTypes = {
  primaryData: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  secondaryData: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  primaryLabel: PropTypes.string,
  secondaryLabel: PropTypes.string,
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
  tooltipRef: PropTypes.instanceOf(Object),
};

const defaultProps = {
  primaryData: [],
  secondaryData: [],
  primaryLabel: 'something',
  secondaryLabel: 'something else',
  cellSize: 18,
  cellGap: 2,
  emptyColor: '#F2F2F2',
  legendCategories: null,
  startDate: moment().startOf('year'),
  endDate: moment().endOf('year'),
  tooltipRef: null,
};

const mouseover = (tooltip) => tooltip.style('opacity', 1);
const mouseleave = (tooltip) => tooltip.style('opacity', 0);
const mousemove = ({
  date, primValue, secValue, primaryLabel, secondaryLabel, cellSize, tooltip,
}) => {
  const { x, y } = d3.event;
  const { width, height } = tooltip.node().getBoundingClientRect();
  const valueText = getValueText({
    val1: primValue, val2: secValue, primaryLabel, secondaryLabel,
  });

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
    .style('stroke-dasharray', '100%')
    .style('stroke-linecap', 'square');
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
  primaryLabel,
  secondaryLabel,
  todayRef,
) => {
  const g = d3.select(todayRef);
  const today = mergedData.find(({ date }) => isToday(date));
  const { primValue, secValue, date } = today;
  const polys = getPolygons(today, cellSize);

  g.attr('transform', () => `translate(
    ${getX(startDate, today.date, cellSize, cellGap)},
    ${getY(today.date, cellSize, cellGap)}
  )`)
    .on('mousemove', () => mousemove({
      date,
      primValue,
      secValue,
      primaryLabel,
      secondaryLabel,
      cellSize,
      tooltip,
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
  primaryLabel,
  secondaryLabel,
  cellSize,
  cellGap,
  emptyColor,
  legendCategories,
  tooltipRef,
}) => {
  const squareRef = useRef(null);
  const monthTextRef = useRef(null);
  const weekdayRef = useRef(null);
  const todayRef = useRef(null);
  const daysRef = useRef(null);
  const tooltip = d3.select(tooltipRef?.current);

  const daysGroup = d3.select(daysRef?.current);

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
    if (daysGroup) {
      const noToday = mergedData.filter(({ date }) => !isToday(date));
      return createSquareBlocks(daysGroup, noToday, cellSize, cellGap);
    }
    return null;
  }, [mergedData, cellGap, cellSize, daysGroup]);

  // Place today
  useEffect(() => {
    if (daysGroup) {
      placeToday(mergedData,
        cellSize,
        startDate,
        cellGap,
        emptyColor,
        legendCategories,
        tooltip,
        primaryLabel,
        secondaryLabel,
        todayRef?.current);
    }
  }, [mergedData,
    cellGap,
    cellSize,
    emptyColor,
    legendCategories,
    startDate,
    primaryLabel,
    secondaryLabel,
    daysGroup,
    tooltip]);

  // Placement of squares
  useEffect(() => {
    if (daysGroup && squares) {
      moveSquares(squares, startDate, cellSize, cellGap);
    }
  }, [cellGap, cellSize, startDate, squares, daysGroup]);

  // Fill squares
  useEffect(() => {
    if (daysGroup && squares) {
      fillSquares(squares, emptyColor, legendCategories, cellSize);
    }
  }, [emptyColor, legendCategories, cellSize, squares, daysGroup]);

  // Mouse events
  useEffect(() => {
    squares
      .on('mousemove', ({ date, primValue, secValue }) => mousemove({
        date,
        primValue,
        secValue,
        primaryLabel,
        secondaryLabel,
        cellSize,
        tooltip,
      }))
      .on('mouseover', () => mouseover(tooltip))
      .on('mouseleave', () => mouseleave(tooltip));
  }, [cellSize, primaryLabel, secondaryLabel, squares, tooltip]);

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
        weekdayOffset: WEEKDAYS_WIDTH,
      });
    }
  }, [cellGap, cellSize, mergedData, primaryData, startDate]);

  return (
    <>
      <C.Months ref={monthTextRef} />
      <C.Weekdays ref={weekdayRef} style={{ transform: `translateY(${MONTHS_HEIGHT}px)` }} />
      <C.Squares id="squares" ref={squareRef} style={{ transform: `translate(${WEEKDAYS_WIDTH}px, ${MONTHS_HEIGHT}px)` }}>
        <g ref={daysRef} />
        <g ref={todayRef} />
      </C.Squares>
    </>
  );
};

Squares.propTypes = propTypes;
Squares.defaultProps = defaultProps;

export default withTheme(Squares);
