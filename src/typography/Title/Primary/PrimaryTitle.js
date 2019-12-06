import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './PrimaryTitle.styled';

const PrimaryTitle = ({ children }) => (
  <Style.Main>
    {children}
  </Style.Main>
);

PrimaryTitle.propTypes = {
  children: PropTypes.any,
};

export default PrimaryTitle;
