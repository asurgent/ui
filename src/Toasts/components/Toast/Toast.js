import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import MdiIcon from '@mdi/react';
import {
  mdiClose,
  mdiCheck,
  mdiFlag,
  mdiAlertCircleOutline,
  mdiInformationOutline,
} from '@mdi/js';
import * as C from './Toast.styled';
import * as Consts from '../../constants';

const getColor = (theme, type) => {
  switch (type) {
    case Consts.TYPE_SUCCESS:
      return {
        border: theme.green700,
        background: theme.green100,
      };
    case Consts.TYPE_INFORMATION:
      return {
        border: theme.blue700,
        background: theme.blue100,
      };
    case Consts.TYPE_ERROR:
      return {
        border: theme.ruby800,
        background: theme.ruby100,
      };
    case Consts.TYPE_WARNING:
      return {
        border: theme.gold900,
        background: theme.gold50,
      };
    default:
      return {
        border: theme.blue800,
        background: theme.blue100,
      };
  }
};

const getIconOnType = (type) => {
  switch (type) {
    case Consts.TYPE_SUCCESS:
      return mdiCheck;
    case Consts.TYPE_INFORMATION:
      return mdiInformationOutline;
    case Consts.TYPE_ERROR:
      return mdiAlertCircleOutline;
    case Consts.TYPE_WARNING:
      return mdiFlag;
    default:
      return mdiInformationOutline;
  }
};

const propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  type: PropTypes.string,
  timeout: PropTypes.number,
  autoClose: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
  theme: PropTypes.instanceOf(Object).isRequired,
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
  theme,
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
      <MdiIcon
        className="icon"
        size={1.4}
        path={getIconOnType(type)}
        style={{
          background: getColor(theme, type).border,
          borderColor: getColor(theme, type).border,
        }}
      />
      <C.Message>{message}</C.Message>
      <MdiIcon size={1.4} path={mdiClose} onClick={onRemove} className="close" />
      <C.Bar
        type={type}
        done={percentageDone}
        style={{
          background: getColor(theme, type).border,
          borderColor: getColor(theme, type).border,
        }}
      />
    </C.Toast>
  );
};

Toast.defaultProps = defaultProps;
Toast.propTypes = propTypes;
Toast.displayName = '@asurgent.ui.Toast';

export default withTheme(Toast);
