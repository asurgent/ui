import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const propTypes = {
  timeout: PropTypes.number,
  unmountChildren: PropTypes.bool,
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

const defaultProps = {
  timeout: 500,
  unmountChildren: true,
};

const withTransitionEffect = (TransitionComponent) => {
  const TransitionHandeler = ({
    isVisible,
    timeout,
    unmountChildren,
    children,
  }) => (
    <Transition timeout={timeout} in={isVisible}>
      {(state) => (
        <TransitionComponent state={state} timeout={timeout}>
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
