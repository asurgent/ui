import React from 'react';
import PropTypes from 'prop-types';
import Shield from './Shield';
import Outside from './OutsideEvent';

const propTypes = {
  dark: PropTypes.bool,
  backgroundColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  onClick: PropTypes.func,
};

const defaultProps = {
  dark: false,
  backgroundColor: null,
  children: null,
  onClick: () => {},
};

const Custom = ({
  children, dark, backgroundColor, ...props
}) => (
  <Shield backgroundColor={backgroundColor} {...props}>
    {children}
  </Shield>
);
Custom.propTypes = propTypes;
Custom.defaultProps = defaultProps;
Custom.displayName = '@asurgent.ui.Shield.Custom';

const Dark = ({
  children, dark, backgroundColor, ...props
}) => (
  <Shield dark {...props}>
    {children}
  </Shield>
);
Dark.propTypes = propTypes;
Dark.defaultProps = defaultProps;
Dark.displayName = '@asurgent.ui.Shield.Dark';

const Transparent = ({
  children, dark, backgroundColor, ...props
}) => (
  <Shield {...props}>
    {children}
  </Shield>
);
Transparent.propTypes = propTypes;
Transparent.defaultProps = defaultProps;
Transparent.displayName = '@asurgent.ui.Shield.Transparent';

const OutsideEvent = ({ children, onClick, ...props }) => (
  <Outside onClick={onClick} {...props}>
    {children}
  </Outside>
);
OutsideEvent.propTypes = propTypes;
OutsideEvent.defaultProps = defaultProps;
OutsideEvent.displayName = '@asurgent.ui.Shield.OutsideEvent';

export {
  Custom, Transparent, Dark, OutsideEvent,
};
