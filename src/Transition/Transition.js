import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { ClickShield } from './Transition.styled';

const propTypes = {
  timeout: PropTypes.number,
  unmountChildren: PropTypes.bool,
  isVisible: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  withClickShield: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(Object),
  ]),
  style: PropTypes.instanceOf(Object),
};

const defaultProps = {
  timeout: 500,
  unmountChildren: true,
  className: '',
  style: {},
  withClickShield: null,
};

const withTransitionEffect = (TransitionComponent) => {
  const TransitionHandeler = ({
    isVisible,
    timeout,
    unmountChildren,
    children,
    className,
    style,
    withClickShield,
  }) => {
    const customStyle = { ...style };
    if (withClickShield) {
      Object.assign(customStyle, {
        zIndex: 1,
      });
    }

    return (
      <>
        {withClickShield && (
        <ClickShield
          isVisible={isVisible}
          onClick={withClickShield}
        />
        )}
        <Transition timeout={timeout} in={isVisible}>
          {(state) => (

            <TransitionComponent
              state={state}
              style={customStyle}
              timeout={timeout}
              className={className}
            >
              { (state !== 'exited' || !unmountChildren) && children}
            </TransitionComponent>
          )}
        </Transition>
      </>
    );
  };

  TransitionHandeler.propTypes = propTypes;
  TransitionHandeler.defaultProps = defaultProps;

  return TransitionHandeler;
};

export default withTransitionEffect;
