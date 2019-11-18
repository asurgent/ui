import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './PrimaryParagraph.styled';

const PrimaryParagraph = ({ children }) => (
  <Style.Main>
    {children}
  </Style.Main>
);

PrimaryParagraph.propTypes = {
  children: PropTypes.any,
};

export default PrimaryParagraph;
