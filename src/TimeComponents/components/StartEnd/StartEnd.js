import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PlayIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { withTheme } from 'styled-components';
import parser from 'cron-parser';
import * as C from './StartEnd.styled';
import * as S from '../../TimeComponents.styled';
import translation from './StartEnd.translation';
import * as Icons from '../Icons';
import { newMoment } from '../../../Moment/momentParsers';

const { t } = translation;

// have to create the moment-object with duration here,
// passing a date in here leads to rounding errors
const getRelativeTime = ({ date, duration }) => {
  let timestamp;
  if (duration) {
    timestamp = newMoment().add(duration, 'seconds');
  } else {
    timestamp = newMoment(date);
  }
  const days = timestamp.diff(newMoment(), 'days');
  const hours = timestamp.diff(newMoment(), 'hours');
  const minutes = timestamp.diff(newMoment(), 'minutes');
  const seconds = timestamp.diff(newMoment(), 'seconds');

  if (days > 0) {
    return { number: days, label: t('days', 'asurgentui') };
  }
  if (hours > 0) {
    return { number: hours, label: t('hours', 'asurgentui') };
  }
  if (minutes > 0) {
    return { number: minutes, label: t('minutes', 'asurgentui') };
  }
  if (seconds > 0) {
    return { number: seconds, label: t('seconds', 'asurgentui') };
  }
  return {};
};

const StartEnd = ({
  cronExpression,
  isOngoing,
  nextDate,
  hasExpired,
  onGoingFrom,
  onGoingTo,
  durationInSeconds,
  theme,
  ...props
}) => {
  const nextNextDate = useMemo(() => {
    try {
      const interval = parser.parseExpression(cronExpression,
        { currentDate: newMoment(nextDate).toString() });
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
        <C.Container {...props}>
          <S.TextSmall withBottomMargin>{t('started', 'asurgentui')}</S.TextSmall>
          <PlayIcon fontSize="large" style={{ fill: theme.blue900 }} />
          <S.TextNormal>{newMoment(onGoingFrom).format('HH:mm')}</S.TextNormal>
          <S.TextSmall withBottomMargin>{newMoment(onGoingFrom).format('YYYY-MM-DD')}</S.TextSmall>
        </C.Container>

        <C.Container>
          <S.TextSmall withBottomMargin>{t('remaining', 'asurgentui')}</S.TextSmall>
          <Icons.Duration active theme={theme} />
          <S.TextNormal>{getRelativeTime({ date: onGoingTo }).number}</S.TextNormal>
          <S.TextSmall withBottomMargin>{getRelativeTime({ date: onGoingTo }).label}</S.TextSmall>
        </C.Container>

        <C.Container {...props}>
          <S.TextSmall withBottomMargin>{t('ends', 'asurgentui')}</S.TextSmall>
          <StopIcon fontSize="large" style={{ fill: theme.blue900 }} />
          <S.TextNormal>{newMoment(onGoingTo).format('HH:mm')}</S.TextNormal>
          <S.TextSmall withBottomMargin>{newMoment(onGoingTo).format('YYYY-MM-DD')}</S.TextSmall>
        </C.Container>
      </C.Dates>
    );
  }

  // calendar versions
  return (
    <C.Dates>
      <C.Container {...props}>
        <C.DateAndTime active={!hasExpired}>
          <S.TextNormal>{newMoment(nextDate).format('DD')}</S.TextNormal>
          <S.TextSmall>
            {`${t(`month${newMoment(nextDate).month()}`)} ${newMoment(nextDate).format('YY')}`}
          </S.TextSmall>
        </C.DateAndTime>
        <C.Time>
          <S.TextSmall>
            {`${t(`day${newMoment(nextDate).day()}`)} ${newMoment(nextDate).format('hh:mm')}`}
          </S.TextSmall>
        </C.Time>
      </C.Container>

      <C.Container>
        <S.TextSmall withBottomMargin>{t('duration', 'asurgentui')}</S.TextSmall>
        <Icons.Duration active theme={theme} />
        <S.TextNormal>{getRelativeTime({ duration: durationInSeconds }).number}</S.TextNormal>
        <S.TextSmall withBottomMargin>
          {getRelativeTime({ duration: durationInSeconds }).label}
        </S.TextSmall>
      </C.Container>

      <C.Container {...props}>
        <C.DateAndTime active={!hasExpired}>
          <S.TextNormal>{newMoment(nextNextDate).format('DD')}</S.TextNormal>
          <S.TextSmall>
            {`${t(`month${newMoment(nextNextDate).month()}`)} ${newMoment(nextNextDate).format('YY')}`}
          </S.TextSmall>
        </C.DateAndTime>
        <C.Time>
          <S.TextSmall>
            {`${t(`day${newMoment(nextNextDate).day()}`)} ${newMoment(nextNextDate).format('hh:mm')}`}
          </S.TextSmall>
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
  endDate: PropTypes.oneOfType([
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
  endDate: null,
};

export default withTheme(StartEnd);
