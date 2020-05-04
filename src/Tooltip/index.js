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
  position: 'midde',
  children: null,
};


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

export { Middle, Right, Left };
