import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './PrimaryLoader.styled';

const PrimaryLoader = ({ children }) => (
  <Style.Main>
    {children}
  </Style.Main>
);

PrimaryLoader.propTypes = {
  children: PropTypes.any,
};

export default PrimaryLoader;
