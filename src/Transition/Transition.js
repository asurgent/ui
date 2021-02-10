import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const propTypes = {
  timeout: PropTypes.number,
  unmountChildren: PropTypes.bool,
  isVisible: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  style: PropTypes.instanceOf(Object),
};

const defaultProps = {
  timeout: 500,
  unmountChildren: true,
  className: '',
  style: {},
};

const withTransitionEffect = (TransitionComponent) => {
  const TransitionHandeler = ({
    isVisible,
    timeout,
    unmountChildren,
    children,
    className,
    style,
  }) => (
    <Transition timeout={timeout} in={isVisible}>
      {(state) => (
        <TransitionComponent
          state={state}
          style={style}
          timeout={timeout}
          className={className}
        >
          { (state !== 'exited' || !unmountChildren) && children}
        </TransitionComponent>
      )}
    </Transition>
  );

  TransitionHandeler.propTypes = propTypes;
  TransitionHandeler.defaultProps = defaultProps;

  return TransitionHandeler;
};

export default withTransitionEffect;
