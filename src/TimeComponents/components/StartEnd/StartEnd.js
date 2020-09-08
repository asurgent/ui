import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PlayIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { withTheme } from 'styled-components';
import parser from 'cron-parser';
import * as C from '../../TimeComponents.styled';
import translation from './StartEnd.translation';
import * as Icons from '../Icons';
import { newMoment } from '../../../Moment/momentParsers';
import { getRelativeTime } from './helpers';

const { t } = translation;

const StartEnd = ({
  cronExpression,
  isOngoing,
  nextDate,
  hasExpired,
  onGoingFrom,
  onGoingTo,
  durationInSeconds,
  theme,
}) => {
  const nextNextDate = useMemo(() => {
    try {
      const interval = parser.parseExpression(cronExpression,
        { currentDate: newMoment(nextDate).toISOString() });
      const d = newMoment(interval.next().toString());
      return d;
    } catch (e) {
      return null;
    }
  }, [cronExpression, nextDate]);

  // play/stop buttons
  if (isOngoing) {
    return (
      <C.Dates>
        <C.Container>
          <C.TextSmall withBottomMargin>{t('started', 'asurgentui')}</C.TextSmall>
          <PlayIcon fontSize="large" style={{ fill: theme.blue900 }} />
          <C.TextNormal>{newMoment(onGoingFrom).format('HH:mm')}</C.TextNormal>
          <C.TextSmall withBottomMargin>{newMoment(onGoingFrom).format('YYYY-MM-DD')}</C.TextSmall>
        </C.Container>

        <C.Container>
          <C.TextSmall withBottomMargin>{t('remaining', 'asurgentui')}</C.TextSmall>
          <Icons.Duration active theme={theme} />
          <C.TextNormal>{getRelativeTime({ date: onGoingTo }).number}</C.TextNormal>
          <C.TextSmall withBottomMargin>{getRelativeTime({ date: onGoingTo }).label}</C.TextSmall>
        </C.Container>

        <C.Container>
          <C.TextSmall withBottomMargin>{t('ends', 'asurgentui')}</C.TextSmall>
          <StopIcon fontSize="large" style={{ fill: theme.blue900 }} />
          <C.TextNormal>{newMoment(onGoingTo).format('HH:mm')}</C.TextNormal>
          <C.TextSmall withBottomMargin>{newMoment(onGoingTo).format('YYYY-MM-DD')}</C.TextSmall>
        </C.Container>
      </C.Dates>
    );
  }

  // calendar versions
  return (
    <C.Dates>
      <C.Container hasExpired={hasExpired}>
        <C.DateAndTime active={!hasExpired}>
          <C.TextNormal>{newMoment(nextDate).format('DD')}</C.TextNormal>
          <C.TextSmall>
            {`${t(`month${newMoment(nextDate).month()}`)} ${newMoment(nextDate).format('YY')}`}
          </C.TextSmall>
        </C.DateAndTime>
        <C.Time>
          <C.TextSmall>
            {`${t(`day${newMoment(nextDate).day()}`)} ${newMoment(nextDate).format('hh:mm')}`}
          </C.TextSmall>
        </C.Time>
      </C.Container>

      <C.Container hasExpired={hasExpired}>
        <C.TextSmall withBottomMargin>{t('duration', 'asurgentui')}</C.TextSmall>
        <Icons.Duration active={!hasExpired} theme={theme} />
        <C.TextNormal>{getRelativeTime({ duration: durationInSeconds }).number}</C.TextNormal>
        <C.TextSmall withBottomMargin>
          {getRelativeTime({ duration: durationInSeconds }).label}
        </C.TextSmall>
      </C.Container>

      <C.Container hasExpired={hasExpired}>
        <C.DateAndTime active={!hasExpired}>
          <C.TextNormal>{newMoment(nextNextDate).format('DD')}</C.TextNormal>
          <C.TextSmall>
            {`${t(`month${newMoment(nextNextDate).month()}`)} ${newMoment(nextNextDate).format('YY')}`}
          </C.TextSmall>
        </C.DateAndTime>
        <C.Time>
          <C.TextSmall>
            {`${t(`day${newMoment(nextNextDate).day()}`)} ${newMoment(nextNextDate).format('hh:mm')}`}
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
  nextDate: PropTypes.oneOfType([
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
  nextDate: null,
  onGoingFrom: null,
  onGoingTo: null,
};

export default withTheme(StartEnd);
