import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  yScale: PropTypes.instanceOf(Object).isRequired,
};

const defaultPtops = {};

const YLinearAxis = ({ yScale }) => {
  const pathData = useMemo(() => {
    const [M, H] = yScale.range();
    return [
      'M', -6, M,
      'H', 0.5,
      'V', H,
      'H', -6,
    ].join(' ');
  }, [yScale]);


  const ticks = useMemo(() => yScale
    .ticks()
    .map((value) => ({
      value,
      yOffset: yScale(value),
    })), [yScale]);

  return (
    <g>
      <path
        d={pathData}
        fill="none"
        stroke="currentColor"
      />
      {ticks.map(({ value, yOffset }) => (
        <g
          key={value}
          transform={`translate(-20, ${yOffset})`}
        >
          <line x1="15" x2="20" stroke="currentColor" />
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(4px)',
            }}
          >
            { value }
          </text>
        </g>
      ))}
    </g>
  );
};


YLinearAxis.propTypes = propTypes;
YLinearAxis.defaultPtops = defaultPtops;

export default YLinearAxis;
