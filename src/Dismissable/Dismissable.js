import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';
import * as C from './Dismissable.styled';

const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  fadeOutSpeed: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

const defaultProps = {
  fadeOutSpeed: 0,
  children: null,
};

export const DismissablePrimary = ({
  id, title, fadeOutSpeed, children,
}) => {
  const [isDismissed, setDismissed] = useState(null);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    const dismissedEarlier = JSON.parse(window.localStorage.getItem(id));
    setDismissed(dismissedEarlier || false);
  }, [id]);

  const setRead = () => {
    setShouldFadeOut(true);
    setTimeout(() => {
      setDismissed(true);
      window.localStorage.setItem(id, true);
    }, fadeOutSpeed);
  };

  if (!isDismissed) {
    return (
      <C.ContainerPrimary fadeOutSpeed={fadeOutSpeed} className={shouldFadeOut ? 'fadeOut' : ''}>
        <C.Header>
          <h3>{title}</h3>
          <C.Dismiss onClick={() => setRead()}>
            <Close fontSize="large" />
          </C.Dismiss>
        </C.Header>
        {children}
      </C.ContainerPrimary>
    );
  }
  return null;
};

DismissablePrimary.propTypes = propTypes;
DismissablePrimary.defaultProps = defaultProps;
DismissablePrimary.displayName = '@asurgent.ui.Dismissable.Primary';


export const DismissablePlain = ({
  id, title, fadeOutSpeed, children,
}) => {
  const [isDismissed, setDismissed] = useState(null);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useEffect(() => {
    const dismissedEarlier = JSON.parse(window.localStorage.getItem(id));
    setDismissed(dismissedEarlier || false);
  }, [id]);

  const setRead = () => {
    setShouldFadeOut(true);
    setTimeout(() => {
      setDismissed(true);
      window.localStorage.setItem(id, true);
    }, fadeOutSpeed);
  };

  if (!isDismissed) {
    return (
      <C.ContainerPlain fadeOutSpeed={fadeOutSpeed} className={shouldFadeOut ? 'fadeOut' : ''}>
        <C.Header>
          <h3>{title}</h3>
          <C.Dismiss onClick={() => setRead()}>
            <Close fontSize="large" />
          </C.Dismiss>
        </C.Header>
        {children}
      </C.ContainerPlain>
    );
  }
  return null;
};

DismissablePlain.propTypes = propTypes;
DismissablePlain.defaultProps = defaultProps;
DismissablePlain.displayName = '@asurgent.ui.Dismissable.Plain';
