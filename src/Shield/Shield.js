import React from 'react';
import { Overlay } from './Shield.styled';

const Shield = ({
  dark,
  backgroundColor,
  children,
  onClick,
}) => (
  <>
    <Overlay
      dark={dark}
      onClick={onClick}
      backgroundColor={backgroundColor}
    />
    {children}
  </>
);

export default Shield;
