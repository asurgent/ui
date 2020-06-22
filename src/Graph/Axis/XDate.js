import React, {
  createRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as d3 from 'd3';
import { customTick } from './helpers';

const AxisGroup = styled.g`
    transform: translate${({ dimensions }) => `(0, ${dimensions.boundedHeight}px)`};
`;

const propTypes = {
  dimensions: PropTypes.instanceOf(Object).isRequired,
  xScale: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {};

const XDateAxis = ({ dimensions, xScale }) => {
  const ref = createRef();

  useEffect(() => {
    d3.select(ref.current)
      .transition()
      .duration(350)
      .call(d3.axisBottom(xScale)
        .tickFormat(customTick));
  }, [ref, xScale]);

  return (
    <AxisGroup ref={ref} dimensions={dimensions} />
  );
};

XDateAxis.propTypes = propTypes;
XDateAxis.defaultProps = defaultProps;

export default XDateAxis;
