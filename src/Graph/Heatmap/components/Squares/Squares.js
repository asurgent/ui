import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as d3 from 'd3';
import { withTheme } from 'styled-components';
import * as C from './Squares.styled';
import translation from './Squares.translation';
import { getColor } from '../../helpers';

const { t } = translation;

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  valueLabel: PropTypes.string,
  onDateClick: PropTypes.func,
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
  theme: PropTypes.instanceOf(Object),
};
const defaultProps = {
  data: null,
  valueLabel: 'value',
  onDateClick: () => null,
  cellSize: 18,
  cellPadding: 2,
  cellRadius: 1,
  emptyColor: '#dadada',
  legendCategories: null,
  startDate: moment().startOf('year'),
  endDate: moment().endOf('year'),
  theme: {},
};

const Squares = ({
  data,
  startDate,
  endDate,
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
  const [selected, setSelected] = useState(null);
  const dateRange = d3.timeDays(startDate, endDate);

  const testData = dateRange.map((d) => {
    const inpDate = data.find((dat) => moment(dat.date).isSame(moment(d), 'day'));
    if (inpDate) {
      return inpDate;
    }
    return { date: d, value: null };
  });

  useEffect(() => {
    const toggleSelected = (d) => {
      if (selected && d.date === selected.date) {
        setSelected(null);
      } else {
        setSelected(d);
      }
    };

    if (squareRef.current) {
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

      const squareGroup = d3.select(squareRef.current);
      const squares = squareGroup
        .selectAll('rect')
        .data(testData)
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
            const currentYear = moment(d.date).startOf('year');
            const week = d3.utcSunday.count(currentYear, d.date);
            return week * cellSize + 30;
          },
        )
        .attr('y', (d) => new Date(d.date).getUTCDay() * cellSize)
        .attr('rx', cellRadius)
        .attr('ry', cellRadius)
        .attr('fill', (d) => {
          if (selected) {
            if (d.date === selected.date) {
              return getColor(d.value, emptyColor || theme.gray100, legendCategories);
            }
            return emptyColor;
          }
          return getColor(d.value, emptyColor || theme.gray100, legendCategories);
        })
        .transition()
        .duration(500);
    }
  }, [cellPadding,
    cellRadius,
    cellSize,
    data,
    emptyColor,
    legendCategories,
    onDateClick,
    selected,
    testData,
    theme.gray100,
    valueLabel]);

  return (<C.Squares ref={squareRef} />);
};

Squares.propTypes = propTypes;
Squares.defaultProps = defaultProps;

export default withTheme(Squares);
