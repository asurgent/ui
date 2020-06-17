import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const AxisGroup = styled.g`
    transform: translate${({ dimensions }) => `(0, ${dimensions.boundedHeight}px)`};
`;

const propTypes = {
  dimensions: PropTypes.instanceOf(Object).isRequired,
  xScale: PropTypes.instanceOf(Object).isRequired,
};

const defaultPtops = {};

const XDateAxis = ({ dimensions, xScale }) => {
  const pathData = useMemo(() => {
    const [M, H] = xScale.range();
    return [
      'M', M, 6,
      'v', -6,
      'H', H,
      'v', 6,
    ].join(' ');
  }, [xScale]);

  const ticks = useMemo(() => xScale
    .ticks()
    .map((value) => ({
      value,
      xOffset: xScale(value),
    })), [xScale]);

  return (
    <AxisGroup dimensions={dimensions}>
      <path
        d={pathData}
        fill="none"
        stroke="currentColor"
      />
      {ticks.map(({ value, xOffset }) => (
        <g
          key={value}
          transform={`translate(${xOffset}, 0)`}
        >
          <line y2="6" stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(20px)',
            }}
          >
            { moment(value).format('D MMM') }
          </text>
        </g>
      ))}
    </AxisGroup>
  );
};

XDateAxis.propTypes = propTypes;
XDateAxis.defaultPtops = defaultPtops;

export default XDateAxis;
