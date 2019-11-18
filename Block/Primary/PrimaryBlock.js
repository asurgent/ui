import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './PrimaryBlock.styled';

const PrimaryBlock = ({ children }) => (
  <Style.Main>
    {children}
  </Style.Main>
);

PrimaryBlock.propTypes = {
  children: PropTypes.any,
};

export default PrimaryBlock;
