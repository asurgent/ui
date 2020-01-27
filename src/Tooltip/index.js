import React from 'react';
import Tooltip from './Tooltip';

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

export { Middle, Right };
