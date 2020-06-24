import React, {
  createRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as d3 from 'd3';
import { customTick } from './helpers';
import ClipPath from '../ClipPath';

const AxisGroup = styled.g`
    transform: translate${({ dimensions }) => `(0, ${dimensions.boundedHeight}px)`};
`;

const propTypes = {
  dimensions: PropTypes.instanceOf(Object).isRequired,
  xScale: PropTypes.instanceOf(Object).isRequired,
  duration: PropTypes.number.isRequired,
  updateTick: PropTypes.number, // Passed from Zoom.js
};

const defaultProps = {
  updateTick: 0,
};

const XDateAxis = ({
  dimensions,
  xScale,
  duration,
  updateTick,
}) => {
  const ref = createRef();


  useEffect(() => {
    // On first update-tick we dont want any duration/transition
    if (updateTick === 0) {
      d3.select(ref.current)
        .call(d3.axisBottom(xScale)
          .tickFormat(customTick));
    // On the upcomming ticks the user will request other
    // domains and we want to use duration/transition
    } else if (updateTick !== 0) {
      d3.select(ref.current)
        .transition()
        .duration(duration)
        .call(d3.axisBottom(xScale)
          .tickFormat(customTick));
    }
  }, [duration, updateTick, xScale, dimensions.width, dimensions.height, ref]);

  return (
    <ClipPath width={dimensions.boundedWidth + 5} x={-5} height={20} y={dimensions.boundedHeight}>
      <AxisGroup ref={ref} dimensions={dimensions} />
    </ClipPath>
  );
};

XDateAxis.propTypes = propTypes;
XDateAxis.defaultProps = defaultProps;

export default XDateAxis;
