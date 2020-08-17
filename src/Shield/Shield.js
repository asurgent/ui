import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
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

const shieldRoot = document.getElementById('shield-root');

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
}) => {
  useEffect(() => {

  }, []);

  return (
    <>
      {shieldIsUp && (
        ReactDOM.createPortal(<Overlay
          dark={dark}
          onClick={onClick}
          backgroundColor={backgroundColor}
        />, shieldRoot)
      )}
      {
        React.Children.map(children, (child) => React
          .cloneElement(child, {
            style: {
              ...(child.props.style || {}),
              zIndex: shieldIsUp ? 3 : 'unset',
              position: 'relative',
            },
          }))
      }
    </>
  );
};

Shield.defaultProps = defaultProps;
Shield.propTypes = propTypes;

export default Shield;
