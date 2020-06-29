import React, { useEffect, createRef, useMemo } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import * as C from './Line.styled';
import ClipPath from '../ClipPath';

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  dimensions: PropTypes.instanceOf(Object).isRequired,
  xScale: PropTypes.instanceOf(Object).isRequired,
  yScale: PropTypes.instanceOf(Object).isRequired,
  yProp: PropTypes.string.isRequired,
  xProp: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  updateTick: PropTypes.number, // Passed from Zoom.js
};

const defaultProps = {
  updateTick: 0,
};

const Line = ({
  xScale,
  yScale,
  data,
  yProp,
  xProp,
  dimensions,
  duration,
  updateTick,
}) => {
  const ref = createRef();
  const line = useMemo(() => d3.line()
    .curve(d3.curveMonotoneX)
    .x(({ [xProp]: x }) => xScale(x))
    .y(({ [yProp]: y }) => yScale(y)),
  [xProp, xScale, yProp, yScale]);

  useEffect(() => {
    // On first update-tick we dont want any duration/transition
    if (updateTick === 0) {
      d3.select(ref.current)
        .datum(data)
        .attr('d', line);
    // On the upcomming ticks the user will request other
    // domains and we want to use duration/transition
    } else if (updateTick !== 0) {
      d3.select(ref.current)
        .datum(data)
        .transition()
        .duration(duration)
        .attr('d', line);
    }
  }, [data, duration, line, ref, updateTick, dimensions]);

  return (
    <ClipPath dimensions={dimensions} inner>
      <C.Line ref={ref} />
    </ClipPath>
  );
};

Line.propTypes = propTypes;
Line.defaultProps = defaultProps;

export default Line;
