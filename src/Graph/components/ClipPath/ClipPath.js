import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as C from './ClipPath.styled';

const propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  transform: PropTypes.instanceOf(Array),
  outer: PropTypes.bool,
  dimensions: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

const defaultProps = {
  outer: false,
  height: null,
  width: null,
  x: 0,
  y: 0,
  transform: [],
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
