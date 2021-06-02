import React from 'react';
import PropTypes from 'prop-types';
import { ErrorState, InfoState, WarningState } from './BlockStatusMessage.styled';

const propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  withMargins: PropTypes.bool,
  withBottomMargin: PropTypes.bool,
  renderTransparent: PropTypes.bool,
};

const defaultProps = {
  title: '',
  children: null,
  withMargins: false,
  withBottomMargin: false,
  renderTransparent: false,
};

const ErrorMessage = ({
  title, children, ...props
}) => (
  <ErrorState {...props}>
    {title && <b className="title">{title}</b>}
    {children}
  </ErrorState>
);

ErrorMessage.propTypes = propTypes;
ErrorMessage.defaultProps = defaultProps;

const WarningMessage = ({
  title, children, ...props
}) => (
  <WarningState {...props}>
    {title && <b className="title">{title}</b>}
    {children}
  </WarningState>
);

WarningMessage.propTypes = propTypes;
WarningMessage.defaultProps = defaultProps;

const InfoMessage = ({
  title, children, ...props
}) => (
  <InfoState {...props}>
    {title && <b className="title">{title}</b>}
    {children}
  </InfoState>
);

InfoMessage.propTypes = propTypes;
InfoMessage.defaultProps = defaultProps;

export { ErrorMessage, WarningMessage, InfoMessage };
