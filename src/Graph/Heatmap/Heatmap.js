import React, { useEffect, useState, useMemo } from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import moment from 'moment';
import translation from './Heatmap.translation';

import * as C from './Heatmap.styled';
import Squares from './components/Squares';
import Legend from './components/Legend';
import DayText from './components/DayText';

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

  const values = useMemo(() => (dates?.length > 0 ? dates.map((c) => c.value) : null), [dates]);
  const maxValue = useMemo(() => (values ? Math.max(...values) : null), [values]);

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
    if (dates && legendCategories) {
      const svg = d3.select('#svg');

      const { width, height } = svg
        .select('g').node().getBoundingClientRect();
      svg.attr('width', width)
        .attr('height', height);
    }
  }, [dates, legendCategories]);

  if (!dates || !legendCategories) {
    return <p>{t('noData', 'asurgentui')}</p>;
  }

  return (
    <>
      <svg id="svg" width="800px" height="800px">
        <C.Group id="group">
          <DayText cellSize={cellSize} />
          <Squares
            dates={dates}
            setDates={setDates}
            valueLabel={valueLabel}
            onDateClick={onDateClick}
            cellSize={cellSize}
            cellPadding={cellPadding}
            cellRadius={cellRadius}
            emptyColor={emptyColor}
            legendCategories={legendCategories}
          />
          <Legend
            legendCategories={legendCategories}
            cellSize={cellSize}
            cellPadding={cellPadding}
            cellRadius={cellPadding}
          />
        </C.Group>
      </svg>
      <C.Tooltip id="tooltip" />
    </>
  );
};

Heatmap.propTypes = propTypes;
Heatmap.defaultProps = defaultProps;

export default withTheme(Heatmap);
