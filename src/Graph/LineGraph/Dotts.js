import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  xScale: PropTypes.instanceOf(Object).isRequired,
  yScale: PropTypes.instanceOf(Object).isRequired,
  yProp: PropTypes.string.isRequired,
  xProp: PropTypes.string.isRequired,
};

const defaultProps = {};

const Dotts = ({
  data, xScale, yScale, yProp, xProp,
}) => {
  const ticks = useMemo(() => data
    .map(({ [xProp]: x, [yProp]: y }) => ({
      key: x,
      cy: yScale(y),
      cx: xScale(x),
    })), [data, xProp, yProp, yScale, xScale]);

  return (
    <g>
      {
      ticks
        .map(({ cx, cy, key }) => (
          <circle key={key} r={2} cx={cx} cy={cy} fill="hotpink" />
        ))
      }
    </g>
  );
};

Dotts.propTypes = propTypes;
Dotts.defaultProps = defaultProps;

export default Dotts;
