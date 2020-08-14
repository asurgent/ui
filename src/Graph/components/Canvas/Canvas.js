import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import moment from 'moment';
import { useChartDimensions } from './useChartDimensions';
import Context from '../Context';

import * as C from './Canvas.styled';

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  children: PropTypes.func.isRequired,
  customDimensions: PropTypes.instanceOf(Object),
  yProp: PropTypes.string.isRequired,
  xProp: PropTypes.string.isRequired,
  markerLines: PropTypes.instanceOf(Array),
  withContext: PropTypes.bool,
};

const defaultProps = {
  customDimensions: {},
  markerLines: [],
  withContext: true,
};

const Canvas = ({
  data,
  children,
  customDimensions,
  yProp,
  xProp,
  markerLines,
  withContext,
}) => {
  const [ref, dimensions] = useChartDimensions(withContext);

  const sortedData = useMemo(() => data
    .reduce((acc, item) => ([{
      ...item,
      [yProp]: item[yProp] === null ? null : Number(item[yProp]),
      [xProp]: moment(item[xProp]),
    }, ...acc]), [])
    .sort((a, b) => a[xProp] - b[xProp]), [data, xProp, yProp]);

  const xScale = useMemo(() => (
    d3.scaleTime()
      .domain(d3.extent(sortedData, ({ [xProp]: x }) => x))
      .range([0, dimensions.boundedWidth])
  ), [dimensions.boundedWidth, sortedData, xProp]);

  const yScale = useMemo(() => {
    // Add markerLines to list of data. In case markerLines
    // is larger/smaller than the chart-data
    const treasholdValues = markerLines !== null
      ? (Array.isArray(markerLines)
        ? [...markerLines]
        : [markerLines])
        .reduce((acc, item) => [...acc, {
          [yProp]: item.value || item,
        }], [])
      : [];

    const [min, max] = d3.extent([
      ...sortedData,
      ...treasholdValues,
    ], ({ [yProp]: y }) => y);

    return (
      d3.scaleLinear()
        .domain([Math.floor(min), Math.ceil(max)])
        .range([dimensions.boundedHeight, 0])
    );
  }, [dimensions.boundedHeight, sortedData, markerLines, yProp]);

  const yScaleContext = useMemo(() => {
    // Add markerLines to list of data. In case markerLines
    // is larger/smaller than the chart-data
    const treasholdValues = markerLines !== null
      ? (Array.isArray(markerLines)
        ? [...markerLines]
        : [markerLines])
        .reduce((acc, item) => [...acc, {
          [yProp]: item.value || item,
        }], [])
      : [];

    const [min, max] = d3.extent([
      ...sortedData,
      ...treasholdValues,
    ], ({ [yProp]: y }) => y);

    return (
      d3.scaleLinear()
        .domain([Math.floor(min), Math.ceil(max)])
        .range([dimensions.contextHeight, 0])
    );
  }, [markerLines, sortedData, dimensions.contextHeight, yProp]);

  return (
    <C.Wrapper ref={ref}>
      <svg width={dimensions.width} height={dimensions.height}>
        <C.ChartGroup dimensions={dimensions}>
          {children({
            yScale,
            xScale,
            dimensions,
            sortedData,
          })}
        </C.ChartGroup>
        <Context
          dimensions={dimensions}
          xScale={xScale}
          yScale={yScaleContext}
          data={sortedData}
          yProp={yProp}
          xProp={xProp}
        />
      </svg>
    </C.Wrapper>
  );
};

Canvas.propTypes = propTypes;
Canvas.defaultProps = defaultProps;

export default Canvas;
