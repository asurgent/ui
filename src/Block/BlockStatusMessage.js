import React from 'react';
import PropTypes from 'prop-types';
import { ErrorState, InfoState, WarningState } from './Block.styled';

const propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  hideLeftBorder: PropTypes.bool,
  withMargins: PropTypes.bool,
  withBottomMargin: PropTypes.bool,
  renderTransparent: PropTypes.bool,
};

const defaultProps = {
  title: null,
  children: null,
  hideLeftBorder: false,
  withMargins: false,
  withBottomMargin: false,
  renderTransparent: false,
};

const ErrorMessage = ({
  title, hideLeftBorder, children, ...props
}) => (
  <ErrorState hideLeftBorder={hideLeftBorder} {...props}>
    {title && <b className="title">{title}</b>}
    {children}
  </ErrorState>
);

ErrorMessage.propTypes = propTypes;
ErrorMessage.defaultProps = defaultProps;
ErrorMessage.displayName = '@asurgent.ui.Block.ErrorMessage';

const WarningMessage = ({
  title, hideLeftBorder, children, ...props
}) => (
  <WarningState hideLeftBorder={hideLeftBorder} {...props}>
    {title && <b className="title">{title}</b>}
    {children}
  </WarningState>
);

WarningMessage.propTypes = propTypes;
WarningMessage.defaultProps = defaultProps;
WarningMessage.displayName = '@asurgent.ui.Block.WarningMessage';

const InfoMessage = ({
  title, hideLeftBorder, children, ...props
}) => (
  <InfoState hideLeftBorder={hideLeftBorder} {...props}>
    {title && <b className="title">{title}</b>}
    {children}
  </InfoState>
);

InfoMessage.propTypes = propTypes;
InfoMessage.defaultProps = defaultProps;
InfoMessage.displayName = '@asurgent.ui.Block.InfoMessage';

export { ErrorMessage, WarningMessage, InfoMessage };
