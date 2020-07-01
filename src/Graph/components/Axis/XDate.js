import React, {
  createRef,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as d3 from 'd3';
import translation from './Axis.translation';
import ClipPath from '../ClipPath';
import { customTick } from './helpers';

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

  const ticks = useMemo(() => {
    const format = customTick(translation.t);
    return d3.axisBottom(xScale).tickFormat(format);
  },
  [xScale]);

  useEffect(() => {
    // On first update-tick we dont want any duration/transition
    if (updateTick === 0) {
      d3.select(ref.current)
        .call(ticks);
    // On the upcomming ticks the user will request other
    // domains and we want to use duration/transition
    } else if (updateTick !== 0) {
      d3.select(ref.current)
        .transition()
        .duration(duration)
        .call(ticks);
    }
  }, [duration, updateTick, xScale, dimensions.width, dimensions.height, ref, ticks]);

  return (
    <ClipPath width={dimensions.boundedWidth + 5} x={-5} height={20} y={dimensions.boundedHeight}>
      <AxisGroup ref={ref} dimensions={dimensions} />
    </ClipPath>
  );
};

XDateAxis.propTypes = propTypes;
XDateAxis.defaultProps = defaultProps;

export default XDateAxis;
