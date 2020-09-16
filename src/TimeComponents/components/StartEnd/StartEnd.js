import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PlayIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { withTheme } from 'styled-components';
import * as C from '../../TimeComponents.styled';
import translation from './StartEnd.translation';
import * as Icons from '../Icons';
import { newMoment } from '../../../Moment/momentParsers';
import { getRelativeTime, getNextNextDate, getLastRun } from './helpers';

const { t } = translation;

const StartEnd = ({
  start,
  end,
  cronExpression,
  isOngoing,
  nextExecution,
  hasExpired,
  onGoingFrom,
  onGoingTo,
  durationInSeconds,
  theme,
}) => {
  const dates = useMemo(() => {
    if (!cronExpression) {
      return {
        from: newMoment(start),
        to: newMoment(end),
      };
    }

    if (isOngoing) {
      return {
        from: newMoment(onGoingFrom),
        to: newMoment(onGoingTo),
      };
    }

    // has next execution-date from the api
    if (nextExecution && cronExpression) {
      return getNextNextDate({ nextExecution, cronExpression });
    }

    // expired but repeated, find the last occurrence and add duration
    return getLastRun({ cronExpression, end, durationInSeconds });
  }, [cronExpression,
    durationInSeconds,
    start,
    end,
    isOngoing,
    nextExecution,
    onGoingFrom,
    onGoingTo,
  ]);

  // play/stop buttons
  if (isOngoing) {
    return (
      <C.Dates>
        <C.Container marginRight>
          <C.TextSmall withBottomMargin>{t('started', 'asurgentui')}</C.TextSmall>
          <PlayIcon fontSize="large" style={{ fill: theme.blue900 }} />
          <C.TextNormal>{newMoment(dates.from).format('HH:mm')}</C.TextNormal>
          <C.TextSmall withBottomMargin>{newMoment(dates.from).format('YYYY-MM-DD')}</C.TextSmall>
        </C.Container>

        <C.Container marginRight marginLeft>
          <C.TextSmall withBottomMargin>{t('remaining', 'asurgentui')}</C.TextSmall>
          <Icons.Duration active theme={theme} />
          <C.TextNormal>{getRelativeTime({ date: dates.to }).number}</C.TextNormal>
          <C.TextSmall withBottomMargin>{getRelativeTime({ date: dates.to }).label}</C.TextSmall>
        </C.Container>

        <C.Container marginLeft>
          <C.TextSmall withBottomMargin>{t('ends', 'asurgentui')}</C.TextSmall>
          <StopIcon fontSize="large" style={{ fill: theme.blue900 }} />
          <C.TextNormal>{newMoment(dates.to).format('HH:mm')}</C.TextNormal>
          <C.TextSmall withBottomMargin>{newMoment(dates.to).format('YYYY-MM-DD')}</C.TextSmall>
        </C.Container>
      </C.Dates>
    );
  }

  // calendar versions
  return (
    <C.Dates>
      <C.Container hasExpired={hasExpired} marginRight>
        <C.DateAndTime active={!hasExpired}>
          <C.TextNormal>{newMoment(dates.from).format('DD')}</C.TextNormal>
          <C.TextSmall>
            {`${t(`month${newMoment(dates.from).month()}`, 'asurgentui')} ${newMoment(dates.from).format('YY')}`}
          </C.TextSmall>
        </C.DateAndTime>
        <C.Time>
          <C.TextSmall>
            {`${t(`day${newMoment(dates.from).day()}`, 'asurgentui')} ${newMoment(dates.from).format('HH:mm')}`}
          </C.TextSmall>
        </C.Time>
      </C.Container>

      <C.Container hasExpired={hasExpired} marginRight marginLeft>
        <C.TextSmall withBottomMargin>{t(hasExpired ? 'lasted' : 'duration', 'asurgentui')}</C.TextSmall>
        <Icons.Duration active={!hasExpired} theme={theme} />
        <C.TextNormal>{getRelativeTime({ duration: durationInSeconds }).number}</C.TextNormal>
        <C.TextSmall withBottomMargin>
          {getRelativeTime({ duration: durationInSeconds }).label}
        </C.TextSmall>
      </C.Container>

      <C.Container hasExpired={hasExpired} marginLeft>
        <C.DateAndTime active={!hasExpired}>
          <C.TextNormal>{newMoment(dates.to).format('DD')}</C.TextNormal>
          <C.TextSmall>
            {`${t(`month${newMoment(dates.to).month()}`, 'asurgentui')} ${newMoment(dates.to).format('YY')}`}
          </C.TextSmall>
        </C.DateAndTime>
        <C.Time>
          <C.TextSmall>
            {`${t(`day${newMoment(dates.to).day()}`, 'asurgentui')} ${newMoment(dates.to).format('HH:mm')}`}
          </C.TextSmall>
        </C.Time>
      </C.Container>
    </C.Dates>
  );
};

StartEnd.propTypes = {
  hasExpired: PropTypes.bool,
  isOngoing: PropTypes.bool,
  cronExpression: PropTypes.string,
  durationInSeconds: PropTypes.number,
  start: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  end: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  nextExecution: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  onGoingFrom: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  onGoingTo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  theme: PropTypes.instanceOf(Object).isRequired,
};

StartEnd.defaultProps = {
  hasExpired: false,
  isOngoing: false,
  cronExpression: null,
  durationInSeconds: null,
  start: null,
  end: null,
  nextExecution: null,
  onGoingFrom: null,
  onGoingTo: null,
};

export default withTheme(StartEnd);
