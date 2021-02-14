import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from './Tooltip';

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

const Primary = ({ children, position, ...props }) => (
  <Tooltip {...props} position={position}>
    {children}
  </Tooltip>
);

const Top = ({ children, position, ...props }) => (
  <Tooltip {...props} position="top">
    {children}
  </Tooltip>
);

const Middle = ({ children, position, ...props }) => (
  <Tooltip {...props} position="middle">
    {children}
  </Tooltip>
);

const Right = ({ children, position, ...props }) => (
  <Tooltip {...props} position="right">
    {children}
  </Tooltip>
);
const Left = ({ children, position, ...props }) => (
  <Tooltip {...props} position="left">
    {children}
  </Tooltip>
);

Middle.propTypes = propTypes;
Middle.defaultProps = defaultProps;
Middle.displayName = '@asurgent.ui.Tooltip.Middle';

Right.propTypes = propTypes;
Right.defaultProps = defaultProps;
Right.displayName = '@asurgent.ui.Tooltip.Right';

Left.propTypes = propTypes;
Left.defaultProps = defaultProps;
Left.displayName = '@asurgent.ui.Tooltip.Left';

Primary.propTypes = propTypes;
Primary.defaultProps = defaultProps;
Primary.displayName = '@asurgent.ui.Tooltip.Primary';

Top.propTypes = propTypes;
Top.defaultProps = defaultProps;
Top.displayName = '@asurgent.ui.Tooltip.Card';

export {
  Middle, Right, Left, Primary, Top,
};
