import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import * as C from './Dismissable.styled';
import * as Transitions from '../Transition';

const propTypes = {
  /**
  * ID that's stored in localstorage to keep track if dismissed or not
  */
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  /**
  * Fade out speed in milliseconds
  */
  fadeOutSpeed: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  /**
  * How large should the button be?
  */
  withBottomMargin: PropTypes.bool,
};

const defaultProps = {
  fadeOutSpeed: 0,
  children: null,
  withBottomMargin: false,
};

export const DismissablePrimary = ({
  id, title, fadeOutSpeed, withBottomMargin, children,
}) => {
  const [isDismissed, setDismissed] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const dismissedEarlier = JSON.parse(window.localStorage.getItem(id));
    setDismissed(dismissedEarlier || false);
  }, [id]);

  const handleDismiss = () => {
    setFadeOut(true);
    setTimeout(() => {
      setDismissed(true);
      window.localStorage.setItem(id, true);
    }, fadeOutSpeed);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <Transitions.FadeOut isVisible={!fadeOut} timeout={fadeOutSpeed}>
      <C.ContainerPrimary withBottomMargin={withBottomMargin}>
        <C.Header>
          <h3>{title}</h3>
          <C.Dismiss onClick={() => handleDismiss()}>
            <MdiIcon
              path={mdiClose}
              size={1.2}
            />
          </C.Dismiss>
        </C.Header>
        {children}
      </C.ContainerPrimary>
    </Transitions.FadeOut>
  );
};

DismissablePrimary.propTypes = propTypes;
DismissablePrimary.defaultProps = defaultProps;

export const DismissablePlain = ({
  id, title, fadeOutSpeed, withBottomMargin, children,
}) => {
  const [isDismissed, setDismissed] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const dismissedEarlier = JSON.parse(window.localStorage.getItem(id));
    setDismissed(dismissedEarlier || false);
  }, [id]);

  const handleDismiss = () => {
    setFadeOut(true);
    setTimeout(() => {
      setDismissed(true);
      window.localStorage.setItem(id, true);
    }, fadeOutSpeed);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <Transitions.FadeOut isVisible={!fadeOut} timeout={fadeOutSpeed}>
      <C.ContainerPlain withBottomMargin={withBottomMargin}>
        <C.Header>
          <h3>{title}</h3>
          <C.Dismiss onClick={() => handleDismiss()}>
            <MdiIcon
              path={mdiClose}
              size={1.2}
            />
          </C.Dismiss>
        </C.Header>
        {children}
      </C.ContainerPlain>
    </Transitions.FadeOut>
  );
};

DismissablePlain.propTypes = propTypes;
DismissablePlain.defaultProps = defaultProps;
