import React from 'react';
import Shield from './Shield';

const Custom = ({
  children, dark, backgroundColor, ...props
}) => (
  <Shield backgroundColor={backgroundColor} {...props}>
    {children}
  </Shield>
);

const Dark = ({
  children, dark, backgroundColor, ...props
}) => (
  <Shield dark {...props}>
    {children}
  </Shield>
);

const Transparent = ({
  children, dark, backgroundColor, ...props
}) => (
  <Shield {...props}>
    {children}
  </Shield>
);

export { Custom, Transparent, Dark };
