import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './PrimaryButton.styled';

const PrimaryButton = ({ children }) => (
  <Style.Main>
    {children}
  </Style.Main>
);

PrimaryButton.propTypes = {
  children: PropTypes.any,
};

export default PrimaryButton;
