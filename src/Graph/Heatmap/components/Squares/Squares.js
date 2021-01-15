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
  cellPadding: 2,
  cellRadius: 1,
  emptyColor: '#F2F2F2',
  legendCategories: null,
  startDate: moment().startOf('year'),
  endDate: moment().endOf('year'),
};

const createSquareBlocks = (group, data, cellSize, cellPadding) => group
  .selectAll('rect')
  .data(data)
  .join('rect')
  .attr('width', cellSize - cellPadding)
  .attr('height', cellSize - cellPadding);

const moveSquares = (squares, startDate, cellSize, cellPadding) => {
  squares
    .attr(
      'x',
      ({ date }) => {
        // If specified startdate, use that, otherwise start of the year
        const firstDate = startDate
          ? moment(startDate)
          : moment(date).startOf('year');

        const weekOffset = d3.utcSunday.count(moment(firstDate), moment(date));
        return (weekOffset * cellSize) + cellPadding + marginFromWeekdays;
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
// looping over all days, try to find prim, otherwise sec, otherwise null
const fillSquares = (squares, emptyColor, legendCategories) => {
  squares
    .attr('fill', ({ primValue, secValue }) => {
      if (primValue) {
        return getColor(primValue, emptyColor, legendCategories);
      }
      if (secValue) {
        return 'rgb(19, 190, 105)';
      }
      return 'rgb(245,246,247)';
    })
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
  endDate,
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
      });
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

  const squares = useMemo(() => {
    if (squareGroup) {
      return createSquareBlocks(
        squareGroup,
        allSquares,
        cellSize,
        cellPadding,
      );
    }
    return null;
  }, [allSquares, cellPadding, cellSize, squareGroup]);

  // Placement of squares
  useEffect(() => {
    if (squareGroup && squares) {
      moveSquares(squares, startDate, cellSize, cellPadding);
    }
  }, [cellPadding, cellSize, startDate, squareGroup, squares]);

  // Fill squares
  useEffect(() => {
    if (squareGroup) {
      fillSquares(squares, emptyColor, legendCategories);
    }
  }, [emptyColor, legendCategories, squareGroup, squares]);

  // Add radius to squares
  useEffect(() => {
    if (squareGroup) {
      addRadiusToSquares(squares, cellRadius);
    }
  }, [cellRadius, squareGroup, squares]);

  useEffect(() => {
    squares
      .on('mousemove', ({ date, value }) => mousemove({
        date, value, valueLabel, cellSize,
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
