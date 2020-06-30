import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as C from './ClipPath.styled';

const propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  dimensions: PropTypes.instanceOf(Object),
  transform: PropTypes.instanceOf(Array),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  outer: PropTypes.bool,
};

const defaultProps = {
  x: 0,
  y: 0,
  height: null,
  width: null,
  dimensions: {},
  transform: [],
  outer: false,
};

const ClipPath = ({
  children,
  dimensions,
  outer,
  height,
  width,
  transform,
  x,
  y,
}) => {
  const id = useMemo(() => `clip${Math.random()}`, []);

  return (
    <g clipPath={`url(#${id})`}>
      {children}
      <clipPath id={id}>
        <C.Clip
          height={height}
          width={width}
          transform={transform}
          x={x}
          y={y}
          dimensions={dimensions}
          outer={outer}
        />
      </clipPath>
    </g>
  );
};

ClipPath.propTypes = propTypes;
ClipPath.defaultProps = defaultProps;

export default ClipPath;
