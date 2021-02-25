import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  position: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

const defaultProps = {
  position: 'middle',
  children: null,
};

const withTheme = (displayName) => (Target) => {
  const Primary = ({ children, position, ...props }) => (
    <Target {...props} position={position}>
      {children}
    </Target>
  );

  const Top = ({ children, position, ...props }) => (
    <Target {...props} position="top">
      {children}
    </Target>
  );

  const Middle = ({ children, position, ...props }) => (
    <Target {...props} position="middle">
      {children}
    </Target>
  );

  const Right = ({ children, position, ...props }) => (
    <Target {...props} position="right">
      {children}
    </Target>
  );
  const Left = ({ children, position, ...props }) => (
    <Target {...props} position="left">
      {children}
    </Target>
  );

  Middle.propTypes = propTypes;
  Middle.defaultProps = defaultProps;
  Middle.displayName = `@asurgent.ui.${displayName}.Middle`;

  Right.propTypes = propTypes;
  Right.defaultProps = defaultProps;
  Right.displayName = `@asurgent.ui.${displayName}.Right`;

  Left.propTypes = propTypes;
  Left.defaultProps = defaultProps;
  Left.displayName = `@asurgent.ui.${displayName}.Left`;

  Primary.propTypes = propTypes;
  Primary.defaultProps = defaultProps;
  Primary.displayName = `@asurgent.ui.${displayName}.Primary`;

  Top.propTypes = propTypes;
  Top.defaultProps = defaultProps;
  Top.displayName = `@asurgent.ui.${displayName}.Card`;

  return {
    Top,
    Left,
    Right,
    Middle,
    Primary,
  };
};

export default withTheme;
