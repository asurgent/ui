import React, {
  useEffect, useMemo, useRef,
} from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as d3 from 'd3';
import translation from './Heatmap.translation';
import * as C from './Heatmap.styled';
import Squares from './components/Squares';
import Legend from './components/Legend';

const { t } = translation;

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  steps: PropTypes.number,
  color: PropTypes.string,
  emptyColor: PropTypes.string,
  theme: PropTypes.instanceOf(Object),
  cellSize: PropTypes.number,
  cellPadding: PropTypes.number,
  cellRadius: PropTypes.number,
  valueLabel: PropTypes.string,
  onDateClick: PropTypes.func,
  showLegend: PropTypes.func,
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
  data: null,
  steps: 5,
  color: null,
  emptyColor: '#F2F2F2',
  theme: {},
  cellSize: 18,
  cellRadius: 1,
  cellPadding: 2,
  valueLabel: 'something',
  onDateClick: () => null,
  showLegend: () => true,
  startDate: moment().startOf('year'),
  endDate: moment().endOf('year'),
};

const Heatmap = ({
  data,
  steps,
  color,
  emptyColor,
  cellSize,
  cellRadius,
  cellPadding,
  valueLabel,
  onDateClick,
  showLegend,
  startDate,
  endDate,
  theme,
}) => {
  const monthTextRef = useRef(null);

  const values = useMemo(() => (data?.length > 0 ? data.map((c) => c.value) : null), [data]);
  const maxValue = useMemo(() => (values ? Math.max(...values) : null), [values]);

  const dateRange = d3.timeDays(startDate, moment(endDate).add(1, 'days'));

  const filledData = dateRange.map((d) => {
    const inpDate = data.find((dat) => moment(dat.date).isSame(moment(d), 'day'));
    if (inpDate) {
      return { ...inpDate, date: moment(inpDate.date).startOf('day') };
    }
    return { date: moment(d), value: null };
  });

  const colorScale = d3
    .scaleLinear()
    .domain([0, steps - 1])
    .range([theme.ruby50 || 'white', color || theme.ruby800]);

  const legendCategories = useMemo(() => [...Array(steps)].map((_, i) => {
    const upperBound = (maxValue / steps) * (i + 1);
    const lowerBound = (maxValue / steps) * i;
    return {
      upperBound,
      lowerBound,
      color: colorScale(i),
    };
  }), [colorScale, maxValue, steps]);

  useEffect(() => {
    if (data && legendCategories) {
      const svg = d3.select('#svg');

      const { width, height } = svg
        .select('g').node().getBoundingClientRect();

      svg.attr('width', width)
        .attr('height', height);
    }
  }, [data, legendCategories]);

  if (!data || !legendCategories) {
    return <p>{t('noData', 'asurgentui')}</p>;
  }

  return (
    <>
      <svg id="svg" preserveAspectRatio="none">
        <C.Group id="group">
          <Squares
            data={filledData}
            startDate={startDate}
            endDate={endDate}
            valueLabel={valueLabel}
            onDateClick={onDateClick}
            cellSize={cellSize}
            cellPadding={cellPadding}
            cellRadius={cellRadius}
            emptyColor={emptyColor}
            legendCategories={legendCategories}
            monthTextRef={monthTextRef}
          />
          {showLegend() && (
            <Legend
              steps={steps}
              startDate={startDate}
              endDate={endDate}
              legendCategories={legendCategories}
              cellSize={cellSize}
              cellPadding={cellPadding}
              cellRadius={cellRadius}
            />
          )}
        </C.Group>
      </svg>
      <C.Tooltip id="tooltip" />
    </>
  );
};

Heatmap.propTypes = propTypes;
Heatmap.defaultProps = defaultProps;

export default withTheme(Heatmap);
