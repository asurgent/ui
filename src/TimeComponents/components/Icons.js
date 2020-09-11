import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  active: PropTypes.bool,
  theme: PropTypes.instanceOf(Object),
};
const defaultProps = {
  active: true,
  theme: {},
};
export const Dots = ({ active, theme }) => {
  const color = active ? theme.blue900 : theme.gray600;
  return (
    <svg width="24" height="21.88" viewBox="0 0 24 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" fill={color} />
      <circle cx="12" cy="2" r="2" fill={color} />
      <circle cx="22" cy="2" r="2" fill={color} />
    </svg>
  );
};
Dots.propTypes = propTypes;
Dots.defaultProps = defaultProps;

export const Duration = ({ active, theme }) => {
  const color = active ? theme.blue900 : theme.gray600;
  return (
    <svg width="54" height="21.88" viewBox="0 0 54 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="5" stroke={color} strokeWidth="2" />
      <circle cx="48" cy="6" r="5" stroke={color} strokeWidth="2" />
      <circle cx="48" cy="6" r="2" fill={color} />
      <line x1="11" y1="6" x2="43" y2="6" stroke={color} strokeWidth="2" />
    </svg>
  );
};
Duration.propTypes = propTypes;
Duration.defaultProps = defaultProps;
