import React from 'react';
import PropTypes from 'prop-types';
import { ErrorState, InfoState, WarningState } from './Block.styled';

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
  <ErrorState {...props}>
    {title && <b className="title">{title}</b>}
    {children}
  </ErrorState>
);

ErrorMessage.propTypes = propTypes;
ErrorMessage.defaultProps = defaultProps;
ErrorMessage.displayName = '@asurgent.ui.Block.ErrorMessage';

const WarningMessage = ({ title, children, ...props }) => (
  <WarningState {...props}>
    {title && <b className="title">{title}</b>}
    {children}
  </WarningState>
);

WarningMessage.propTypes = propTypes;
WarningMessage.defaultProps = defaultProps;
WarningMessage.displayName = '@asurgent.ui.Block.WarningMessage';

const InfoMessage = ({ title, children, ...props }) => (
  <InfoState {...props}>
    {title && <b className="title">{title}</b>}
    {children}
  </InfoState>
);

InfoMessage.propTypes = propTypes;
InfoMessage.defaultProps = defaultProps;
InfoMessage.displayName = '@asurgent.ui.Block.InfoMessage';

export { ErrorMessage, WarningMessage, InfoMessage };
