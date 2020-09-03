import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import * as C from './Ring.styled';

const propTypes = {
  color: PropTypes.string,
  radius: PropTypes.number,
  stroke: PropTypes.number,
  progress: PropTypes.number,
  showPercentage: PropTypes.bool,
  useShadow: PropTypes.bool,
  useAnimation: PropTypes.bool,
  theme: PropTypes.instanceOf(Object),
};

const defaultProps = {
  color: null,
  radius: 60,
  stroke: 4,
  progress: 95,
  showPercentage: false,
  useShadow: false,
  useAnimation: false,
  theme: {},
};

const Ring = ({
  radius, stroke, progress, showPercentage, color, useShadow, useAnimation, theme,
}) => {
  const normalizedRadius = useMemo(() => radius - stroke * 0.5,
    [radius, stroke]);

  const circumference = useMemo(() => (normalizedRadius * 2 * Math.PI),
    [normalizedRadius]);

  const strokeDashoffset = useMemo(() => circumference - (progress / 100) * circumference,
    [circumference, progress]);

  return (
    <C.Container>
      <svg height={radius * 2} width={radius * 2}>
        {useShadow && (
        <C.Ring
          radius={radius}
          stroke={theme.gray200}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: 0 }}
          stroke-width={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        )}

        <C.Ring
          radius={radius}
          stroke={color || theme.blue900}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          stroke-width={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          useAnimation={useAnimation}
        />
      </svg>
      {showPercentage && (
        <C.Text radius={radius}>
          {Math.floor(progress)}
          <C.Small>%</C.Small>
        </C.Text>
      )}
    </C.Container>
  );
};

Ring.propTypes = propTypes;
Ring.defaultProps = defaultProps;

export default withTheme(Ring);
