import React, { useEffect, createRef, useMemo } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import * as C from './LineGraph.styled';
import ClipPath from '../ClipPath';

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  dimensions: PropTypes.instanceOf(Object).isRequired,
  xScale: PropTypes.instanceOf(Object).isRequired,
  yScale: PropTypes.instanceOf(Object).isRequired,
  yProp: PropTypes.string.isRequired,
  xProp: PropTypes.string.isRequired,
};

const defaultPtops = {};

const Line = ({
  xScale, yScale, data, yProp, xProp, dimensions,
}) => {
  const ref = createRef();
  const line = useMemo(() => d3.line()
    .x(({ [xProp]: x }) => xScale(x))
    .y(({ [yProp]: y }) => yScale(y)),
  [xProp, xScale, yProp, yScale]);

  useEffect(() => {
    d3.select(ref.current)
      .select('.line')
      .datum(data)
      .transition()
      .duration(350)
      .attr('d', line);
  }, [data, line, ref]);

  return (
    <ClipPath dimensions={dimensions}>
      <g ref={ref}>
        <C.Line className="line" />
      </g>
    </ClipPath>
  );
};

Line.propTypes = propTypes;
Line.defaultPtops = defaultPtops;

export default Line;
