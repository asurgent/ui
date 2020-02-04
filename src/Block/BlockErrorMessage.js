import React from 'react';
import PropTypes from 'prop-types';
import { Errorstate as Wrapper } from './Block.styled';

const propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

const defaultProps = {
  children: null,
};

const ErrorMessage = ({ title, children, ...props }) => (
  <Wrapper {...props}>
    {title && <b className="title">{title}</b>}
    {children}
  </Wrapper>
);

ErrorMessage.propTypes = propTypes;
ErrorMessage.defaultProps = defaultProps;
ErrorMessage.displayName = '@asurgent.ui.Block.ErrorMessage';

export default ErrorMessage;
