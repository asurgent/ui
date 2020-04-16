import React from 'react';
import PropTypes from 'prop-types';
import * as C from './Loader.styled';

const propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  speed: PropTypes.number,
};

const defaultProps = {
  size: 15,
  color: 'black',
  speed: 2,
};

const Loader = ({ size, color, speed }) => (
  <>
    <C.Wrapper size={size}>
      <C.Ring size={size} color={color} speed={speed} />
    </C.Wrapper>
  </>
);

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;

export default Loader;
