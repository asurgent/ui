import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import parser from 'cron-parser';
import PlayIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { withTheme } from 'styled-components';
import * as C from './StartEnd.styled';
import * as S from '../../TimeComponents.styled';
import translation from './StartEnd.translation';
import * as Icons from '../Icons';
import { getDay, parseMoment, getMonthYear } from '../../helpers';

const { t } = translation;

// have to create the moment-object with duration here,
// passing a date in here leads to rounding errors
const getRelativeTime = ({ date, duration }) => {
  let timestamp;
  if (duration) {
    timestamp = moment().add(duration, 'seconds');
  } else {
    timestamp = moment(date);
  }
  const days = timestamp.diff(moment(), 'days');
  const hours = timestamp.diff(moment(), 'hours');
  const minutes = timestamp.diff(moment(), 'minutes');
  const seconds = timestamp.diff(moment(), 'seconds');

  if (days > 0) {
    return { number: days, label: 'days' };
  }
  if (hours > 0) {
    return { number: hours, label: 'hours' };
  }
  if (minutes > 0) {
    return { number: minutes, label: 'minutes' };
  }
  if (seconds > 0) {
    return { number: seconds, label: 'seconds' };
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
  const isRecurring = useMemo(() => cronExpression !== null || cronExpression !== '', [cronExpression]);

  if (isOngoing) {
    return (
      <C.Dates>
        <C.Container {...props}>
          <S.TextSmall withBottomMargin>{t('started', 'asurgentui')}</S.TextSmall>
          <PlayIcon fontSize="large" style={{ fill: theme.blue900 }} />
          <S.TextNormal>{moment(onGoingFrom).format('HH:mm')}</S.TextNormal>
          <S.TextSmall withBottomMargin>{moment(onGoingFrom).format('YYYY-MM-DD')}</S.TextSmall>
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
          <S.TextNormal>{moment(onGoingTo).format('HH:mm')}</S.TextNormal>
          <S.TextSmall withBottomMargin>{moment(onGoingTo).format('YYYY-MM-DD')}</S.TextSmall>
        </C.Container>
      </C.Dates>
    );
  }

  return (
    <C.Dates>
      <C.Container {...props}>
        <C.DateAndTime>
          <S.TextNormal>{moment(onGoingFrom).format('DD')}</S.TextNormal>
          <S.TextSmall>{moment(onGoingFrom).format('MMM YY')}</S.TextSmall>
        </C.DateAndTime>
        <C.Time>
          <S.TextSmall>wed 23:00</S.TextSmall>
        </C.Time>
      </C.Container>

      <C.Container>
        <S.TextSmall withBottomMargin>{t('remaining', 'asurgentui')}</S.TextSmall>
        <Icons.Duration active theme={theme} />
        <S.TextNormal>{getRelativeTime({ duration: durationInSeconds }).number}</S.TextNormal>
        <S.TextSmall withBottomMargin>
          {getRelativeTime({ duration: durationInSeconds }).label}
        </S.TextSmall>
      </C.Container>

      <C.Container {...props}>
        <C.DateAndTime>
          <S.TextNormal>{moment(onGoingTo).format('DD')}</S.TextNormal>
          <S.TextSmall>{moment(onGoingTo).format('MMM YY')}</S.TextSmall>
        </C.DateAndTime>
        <C.Time>
          <S.TextSmall>wed 23:00</S.TextSmall>
        </C.Time>
      </C.Container>
    </C.Dates>
  );
};

StartEnd.propTypes = {
  endDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  cronExpression: PropTypes.string,
  durationInSeconds: PropTypes.number,
  theme: PropTypes.instanceOf(Object).isRequired,
};

StartEnd.defaultProps = {
  endDate: moment().add(1, 'week'),
  cronExpression: '* * * * *',
  durationInSeconds: 1800,
};

export default withTheme(StartEnd);
/*

  return (
    <C.Date data-testid="expired" {...props}>
      <S.TextSmall withBottomMargin>{t('nextDate', 'asurgentui')}</S.TextSmall>
      <C.ExpiredDate>
        <S.TextNormal>{t('naIcon', 'asurgentui')}</S.TextNormal>
        <S.TextSmall>{t('exired', 'asurgentui')}</S.TextSmall>
      </C.ExpiredDate>
    </C.Date>
  );

  // If not recurring, next date N/A
  if (!isRecurring) {
    return (
      <C.Date data-testid="expired" {...props}>
        <S.TextSmall withBottomMargin>{t('nextDate', 'asurgentui')}</S.TextSmall>
        <C.ExpiredDate>
          <S.TextNormal>{t('naIcon', 'asurgentui')}</S.TextNormal>
          <S.TextSmall>{t('naText', 'asurgentui')}</S.TextSmall>
        </C.ExpiredDate>
      </C.Date>
    );
  }

  return (
    <C.Date {...props}>
      <S.TextSmall withBottomMargin>{t('nextDate', 'asurgentui')}</S.TextSmall>
      <C.NextDate data-testid="next-run">
        <S.TextNormal>{parseMoment(nextDate).format('DD')}</S.TextNormal>
        <S.TextSmall>{getMonthYear(parseMoment(nextDate))}</S.TextSmall>
      </C.NextDate>
    </C.Date>
  );

*/
