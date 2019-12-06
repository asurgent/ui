import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './PrimaryTag.styled';

const PrimaryTag = ({ children }) => (
  <Style.Main>
    {children}
  </Style.Main>
);

PrimaryTag.propTypes = {
  children: PropTypes.any,
};

export default PrimaryTag;
