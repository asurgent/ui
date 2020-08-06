import React from 'react';
import PropTypes from 'prop-types';
import { Overlay } from './Shield.styled';

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
  shieldIsUp: PropTypes.bool,
};

const defaultProps = {
  dark: false,
  backgroundColor: null,
  children: null,
  shieldIsUp: true,
  onClick: () => {},
};

const Shield = ({
  dark,
  backgroundColor,
  children,
  onClick,
  shieldIsUp,
}) => (
  <>
    {shieldIsUp && (
      <Overlay

        dark={dark}
        onClick={onClick}
        backgroundColor={backgroundColor}
      />
    )}
    {children}
  </>
);

Shield.defaultProps = defaultProps;
Shield.propTypes = propTypes;

export default Shield;
