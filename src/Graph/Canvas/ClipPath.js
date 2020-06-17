import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  dimensions: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

const defaultPtops = {};

const ClipPath = ({
  children, dimensions,
}) => (
  <g clipPath="url(#clip)">
    {children}
    <clipPath id="clip">
      <rect x={0} y={0} width={dimensions.boundedWidth} height={dimensions.boundedHeight} />
    </clipPath>
  </g>
);

ClipPath.propTypes = propTypes;
ClipPath.defaultPtops = defaultPtops;

export default ClipPath;
