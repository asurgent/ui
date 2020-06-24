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
  threashold: PropTypes.number,
};

const defaultProps = {
  customDimensions: {},
  threashold: null,
};

const Canvas = ({
  data,
  children,
  customDimensions,
  yProp,
  xProp,
  threashold,
}) => {
  const [ref, dimensions] = useChartDimensions(customDimensions);

  const sortedData = useMemo(() => data
    .reduce((acc, item) => ([{
      ...item,
      [xProp]: moment(item[xProp]),
    }, ...acc]), [])
    .sort((a, b) => a[xProp] - b[xProp]), [data, xProp]);

  const xScale = useMemo(() => (
    d3.scaleTime()
      .domain(d3.extent(sortedData, ({ [xProp]: x }) => x))
      .range([0, dimensions.boundedWidth])
  ), [dimensions.boundedWidth, sortedData, xProp]);

  const yScale = useMemo(() => {
    const [min, max] = d3.extent([...sortedData, {
      // Add threashold to list of data. In case threashold is larger/smaller than the chart-data
      [yProp]: threashold,
    }], ({ [yProp]: y }) => y);

    return (
      d3.scaleLinear()
        .domain([Math.floor(min), Math.ceil(max)])
        .range([dimensions.boundedHeight, 0])
    );
  }, [dimensions.boundedHeight, sortedData, threashold, yProp]);


  return (
    <div ref={ref} style={{ height: '200px' }}>
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
    </div>
  );
};


Canvas.propTypes = propTypes;
Canvas.defaultProps = defaultProps;

export default Canvas;
