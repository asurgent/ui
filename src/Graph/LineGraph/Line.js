import React, { useMemo } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import * as C from './LineGraph.styled';

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  xScale: PropTypes.instanceOf(Object).isRequired,
  yScale: PropTypes.instanceOf(Object).isRequired,
  yProp: PropTypes.string.isRequired,
  xProp: PropTypes.string.isRequired,
};

const defaultPtops = {};

const Line = ({
  xScale, yScale, data, yProp, xProp,
}) => {
  const line = useMemo(() => (
    d3.line()
      .x(({ [xProp]: x }) => xScale(x))
      .y(({ [yProp]: y }) => yScale(y))(data)
  ), [data, xProp, xScale, yProp, yScale]);

  return (<g><C.Line d={line} /></g>);
};

Line.propTypes = propTypes;
Line.defaultPtops = defaultPtops;

export default Line;


// const updateChart = useCallback(() => {}, []);

// const brush = useMemo(() => d3.brushX()
//   .extent([[0, 0], [customDimensions.boundedWidth, customDimensions.boundedHeight]])
//   .on('end', updateChart), [
//   customDimensions.boundedHeight,
//   customDimensions.boundedWidth,
//   updateChart]);


// useEffect(() => {
//   const element = ref.current;
//   const line = d3.select(element)
//     .select('#brushgroup')
//     .attr('clip-path', 'url(#clip)');

//   // // Add the line
//   // line.append('path')
//   //   .datum(sortedData)
//   //   .attr('class', 'line') // I add the class line to be able to modify this line later on.
//   //   .attr('fill', 'none')
//   //   .attr('stroke', 'steelblue')
//   //   .attr('stroke-width', 1.5)
//   //   .attr('d', d3.line()
//   //     .x(({ [xProp]: x }) => xScale(x))
//   //     .y(({ [yProp]: y }) => yScale(y)));

//   // Add the brushing
//   line
//     .append('g')
//     .attr('class', 'brush')
//     .call(brush);
// }, [brush, ref, sortedData, xProp, xScale, yProp, yScale]);
