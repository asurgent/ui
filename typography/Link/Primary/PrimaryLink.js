import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './PrimaryLink.styled';

const PrimaryLink = ({ children }) => (
  <Style.Main>
    {children}
  </Style.Main>
);

PrimaryLink.propTypes = {
  children: PropTypes.any,
};

export default PrimaryLink;
