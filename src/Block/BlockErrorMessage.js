import React from 'react';
import PropTypes from 'prop-types';
import { Errorstate as Wrapper } from './Block.styled';

const propTyps = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

const ErrorMessage = ({ title, children, ...props }) => (
  <Wrapper {...props}>
    {title && <b className="title">{title}</b>}
    {children}
  </Wrapper>
);

ErrorMessage.propTypes = propTyps;

export default ErrorMessage;
