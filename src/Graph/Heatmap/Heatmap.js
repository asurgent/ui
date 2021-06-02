import React, {
  useMemo, useRef, useLayoutEffect, useState, createRef,
} from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as d3 from 'd3';
import * as C from './Heatmap.styled';
import Squares from './components/Squares';
import Legend from './components/Legend';
import { WEEKDAYS_WIDTH } from './Constants';

const propTypes = {
  primaryData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      value: PropTypes.number,
    }),
  ),
  secondaryData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      value: PropTypes.number,
    }),
  ),
  steps: PropTypes.number,
  color: PropTypes.string,
  emptyColor: PropTypes.string,
  theme: PropTypes.instanceOf(Object),
  cellGap: PropTypes.number,
  primaryLabel: PropTypes.string,
  secondaryLabel: PropTypes.string,
  showLegend: PropTypes.func,
};

const defaultProps = {
  primaryData: null,
  secondaryData: null,
  steps: 5,
  color: null,
  emptyColor: '#F2F2F2',
  theme: {},
  cellGap: 4,
  primaryLabel: 'something',
  secondaryLabel: 'something else',
  showLegend: () => true,
};

const useSvgGroupSize = (ref) => {
  const [size, setSize] = useState(ref?.current?.getBoundingClientRect()?.width || 0);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (ref?.current) {
        const { width } = ref?.current.getBoundingClientRect();
        setSize(width);
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, [ref]);
  return size;
};

const Heatmap = ({
  primaryData,
  secondaryData,
  steps,
  color,
  emptyColor,
  cellGap,
  primaryLabel,
  secondaryLabel,
  showLegend,
  theme,
}) => {
  const monthTextRef = useRef(null);
  const groupRef = useRef(null);
  const svgRef = createRef(null);
  const tooltipRef = useRef(null);

  const startDate = useMemo(() => {
    if (primaryData && secondaryData) {
      const dates = [...primaryData, ...secondaryData].map((d) => moment(d.date));
      return moment.min(dates);
    }
    return null;
  }, [primaryData, secondaryData]);

  const endDate = useMemo(() => {
    if (primaryData && secondaryData) {
      const dates = [...primaryData, ...secondaryData].map((d) => moment(d.date));
      return moment.max(dates);
    }
    return null;
  }, [primaryData, secondaryData]);

  const maxValue = useMemo(() => {
    if (primaryData?.find((d) => d.value)) {
      const values = primaryData.map((d) => d.value);

      return Math.max(...values);
    }
    return null;
  }, [primaryData]);

  const colorScale = useMemo(() => d3
    .scaleLinear()
    .domain([0, steps - 1])
    .range([theme.ruby50 || 'white', color || theme.ruby800]), [color, steps, theme.ruby50, theme.ruby800]);

  const legendCategories = useMemo(() => [...Array(steps)].map((_, i) => {
    const upperBound = (maxValue / steps) * (i + 1);
    const lowerBound = (maxValue / steps) * i;
    return {
      upperBound,
      lowerBound,
      color: colorScale(i),
    };
  }), [colorScale, maxValue, steps]);

  const svgGroupWidth = useSvgGroupSize(svgRef);

  const cellSize = useMemo(() => {
    if (startDate && endDate) {
      const weeks = d3
        .utcSunday
        .count(moment(startDate), moment(endDate)) + 1;
      const cellGapOffset = weeks * cellGap;
      return (svgGroupWidth - cellGapOffset - WEEKDAYS_WIDTH) / weeks;
    }
    return null;
  }, [cellGap, endDate, startDate, svgGroupWidth]);

  const monthHeight = 20;
  const legendHeight = cellSize + 15; // 15 => text height
  const svgHeight = ((cellSize + cellGap) * 7) + monthHeight + (showLegend() ? legendHeight : 0);

  const reduceToObject = (arr) => arr.reduce((acc, cur) => ({ ...acc, [cur.date]: cur.value }), {});

  const mergedData = useMemo(() => {
    if (endDate && startDate && primaryData && secondaryData) {
      const primObj = reduceToObject(primaryData);
      const secObj = reduceToObject(secondaryData);
      const days = moment(endDate).diff(moment(startDate), 'days') + 1;

      return [...Array(days)].map((_, index) => {
        const curDate = moment(moment(startDate).add(index, 'days')).format('YYYY-MM-DD');

        return {
          date: curDate,
          primValue: primObj[curDate],
          secValue: secObj[curDate],
        };
      });
    }
    return null;
  }, [endDate, primaryData, secondaryData, startDate]);

  if (mergedData) {
    return (
      <>
        <svg ref={svgRef} width="100%" height={svgHeight}>
          <C.Group ref={groupRef}>

            <Squares
              data={mergedData}
              startDate={startDate}
              primaryLabel={primaryLabel}
              secondaryLabel={secondaryLabel}
              cellGap={cellGap}
              emptyColor={emptyColor}
              legendCategories={legendCategories}
              monthTextRef={monthTextRef}
              containerWidth={svgGroupWidth}
              cellSize={Math.abs(cellSize)}
              tooltipRef={tooltipRef}
            />

            {showLegend() && (
              <Legend
                steps={steps}
                legendCategories={legendCategories}
                cellSize={Math.abs(cellSize)}
                cellGap={cellGap}
              />
            )}

          </C.Group>
        </svg>
        <C.Tooltip ref={tooltipRef} id="tooltip" />
      </>
    );
  }
  return null;
};

Heatmap.propTypes = propTypes;
Heatmap.defaultProps = defaultProps;

export default withTheme(Heatmap);
