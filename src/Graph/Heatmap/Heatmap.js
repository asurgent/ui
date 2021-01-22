import React, {
  useEffect, useMemo, useRef, useLayoutEffect, useState, createRef,
} from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as d3 from 'd3';
// import translation from './Heatmap.translation';
import * as C from './Heatmap.styled';
import Squares from './components/Squares';
// import Legend from './components/Legend';
import { marginFromWeekdays } from './constants';

// const { t } = translation;

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
  valueLabel: PropTypes.string,
  // showLegend: PropTypes.func,
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
  steps: 5,
  color: null,
  emptyColor: '#F2F2F2',
  theme: {},
  cellGap: 2,
  valueLabel: 'something',
  // showLegend: () => true,
  startDate: moment().startOf('year'),
  endDate: moment().endOf('year'),
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
  valueLabel,
  // showLegend,
  startDate,
  endDate,
  theme,
}) => {
  const monthTextRef = useRef(null);
  const groupRef = useRef(null);
  const svgRef = createRef(null);
  const containerRef = useRef(null);

  const maxValue = useMemo(() => {
    if (primaryData.find((d) => d.value)) {
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
  const weeks = useMemo(() => d3.utcSunday.count(startDate, endDate), [endDate, startDate]);

  const svgGroupWidth = useSvgGroupSize(svgRef);
  console.log('svgGroupWidth', svgGroupWidth);
  const cellSize = svgGroupWidth === 0 ? cellGap
    : (svgGroupWidth / (weeks + 1) - (marginFromWeekdays / (weeks + 1)));

  /*  useEffect(() => {
    const { height } = groupRef?.current?.getBoundingClientRect();
    const { width } = groupRef?.current?.getBoundingClientRect();

    svgRef.current.setAttribute('width', width);
    svgRef.current.setAttribute('height', height);
  }, [cellSize]); */

  /*

  if (!data || !legendCategories) {
    return <p>{t('noData', 'asurgentui')}</p>;
  } */
  const containerWidth = svgRef?.current?.getBoundingClientRect().width;

  return (

    <svg ref={svgRef} width="100%" height="100%">
      {/* preserveAspectRatio="none"  viewBox="0 0 100 100" */}
      {/* <C.Group ref={groupRef}> */}
      <Squares
        primaryData={primaryData}
        secondaryData={secondaryData}
        startDate={startDate}
        endDate={endDate}
        valueLabel={valueLabel}
        cellSize={cellSize}
        cellGap={cellGap}
        emptyColor={emptyColor}
        legendCategories={legendCategories}
        monthTextRef={monthTextRef}
        containerWidth={svgGroupWidth}
      />

      {/*

          {showLegend() && (
          <Legend
            steps={steps}
            startDate={startDate}
            endDate={endDate}
            legendCategories={legendCategories}
            cellSize={cellSize}
            cellGap={cellGap}
          />
          )}
            */}
      {/* </C.Group> */}
    </svg>

  );
};

Heatmap.propTypes = propTypes;
Heatmap.defaultProps = defaultProps;

export default withTheme(Heatmap);

/* <div ref={containerRef}> */
/* <C.Tooltip id="tooltip" />
    </div> */
