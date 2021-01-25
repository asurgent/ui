import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import moment from 'moment';
import { useChartDimensions } from './useChartDimensions';
import * as C from './Canvas.styled';

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  children: PropTypes.func.isRequired,
  customDimensions: PropTypes.instanceOf(Object),
  yProp: PropTypes.string.isRequired,
  xProp: PropTypes.string.isRequired,
  markerLines: PropTypes.instanceOf(Array),
};

const defaultProps = {
  customDimensions: {},
  markerLines: [],
};

const Canvas = ({
  data,
  children,
  customDimensions,
  yProp,
  xProp,
  markerLines,
}) => {
  const [ref, dimensions] = useChartDimensions(customDimensions);

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
          [yProp]: item?.value !== undefined ? item.value : item,
        }], [])
      : [];

    const [min, max] = d3.extent([
      ...sortedData,
      ...treasholdValues,
    ], ({ [yProp]: y }) => y);

    const diff = 0.05 * Math.abs(max - min);

    return (
      d3.scaleLinear()
        .domain([Math.floor(min), Math.ceil(max + diff)])
        .range([dimensions.boundedHeight, 0])
    );
  }, [dimensions.boundedHeight, sortedData, markerLines, yProp]);

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
      </svg>
    </C.Wrapper>
  );
};

Canvas.propTypes = propTypes;
Canvas.defaultProps = defaultProps;

export default Canvas;
