import React from 'react';
import PropTypes from 'prop-types';
import * as C from './Spinner.styled';

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  speed: PropTypes.number,
};

const defaultProps = {
  size: 15,
  color: null,
  speed: 2,
};

const Spinner = ({
  size, color, speed,
}) => (<C.Ring size={size} color={color} speed={speed} />);

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
