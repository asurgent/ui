import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';
import * as C from './Toast.styled';

const propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  timeout: PropTypes.number,
  autoClose: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
};

const defaultProps = {
  timeout: 5,
  type: 'info',
  autoClose: true,
};

const Toast = ({
  message,
  type,
  autoClose,
  onRemove,
  timeout,
}) => {
  const [timer, setTimer] = useState(null);
  const [timerStart, setTimerStart] = useState(null);
  const [percentageDone, setPercentageUntillClose] = useState(0);
  const timeoutInMS = useMemo(() => timeout * 1000, [timeout]);

  const startTimer = () => {
    setTimerStart(new Date().getTime());
    setTimer(setTimeout(() => {
      onRemove();
    }, timeoutInMS));
  };

  const stopTimer = () => {
    if (timer != null) {
      clearTimeout(timer);
      setTimer(null);
      setTimerStart(null);
      setPercentageUntillClose(0);
    }
  };

  useEffect(() => {
    let interval = null;
    if (timer) {
      interval = setInterval(() => {
        const diff = new Date().getTime() - timerStart;
        const rawPercentage = (diff / timeoutInMS) * 100;
        const closestToEvenFive = (Math.ceil(rawPercentage));
        const percentage = Math.max(0, Math.min(100, closestToEvenFive));

        setPercentageUntillClose(percentage);
      }, 50);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  useEffect(() => {
    if (autoClose) {
      startTimer();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCancelTimer = () => stopTimer();

  const onSetTimer = () => {
    if (autoClose && timer === null) {
      startTimer();
    }
  };

  return (
    <C.Toast type={type} onMouseEnter={onCancelTimer} onMouseLeave={onSetTimer}>
      <C.Message>{message}</C.Message>
      <Close fontSize="large" onClick={onRemove} className="close" />
      <C.Bar type={type} done={percentageDone} />
    </C.Toast>
  );
};

Toast.defaultProps = defaultProps;
Toast.propTypes = propTypes;
Toast.displayName = '@asurgent.ui.Toast';

export default Toast;
