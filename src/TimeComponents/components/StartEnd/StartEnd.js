import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import parser from 'cron-parser';
import * as C from './StartEnd.styled';
import * as S from '../../TimeComponents.styled';
import translation from './StartEnd.translation';
import * as Icons from '../Icons';
import { getDay } from '../../helpers';

const { t } = translation;

const StartEnd = ({
  endDate,
  cronExpression,
  durationInSeconds,
}) => {
  const validCronInterval = useMemo(() => {
    try {
      return parser.parseExpression(cronExpression);
    } catch (e) {
      return null;
    }
  }, [cronExpression]);

  const previousOccasion = useMemo(() => {
    try {
      return moment(new Date(validCronInterval.prev().toString()));
    } catch (e) {
      return null;
    }
  }, [validCronInterval]);

  const isRunning = useMemo(() => {
    try {
      return previousOccasion.add(durationInSeconds, 'seconds') > moment();
    } catch (e) {
      return false;
    }
  }, [durationInSeconds, previousOccasion]);

  // new date needed for deprecation warning
  const isExpired = useMemo(() => moment(new Date(endDate)) < moment(), [endDate]);

  const occasion = useMemo(() => {
    try {
      const prevOccasion = moment(new Date(validCronInterval.prev().toString()));
      const nextOccasion = moment(new Date(validCronInterval.next().toString()));

      const prevOccasionEnd = moment(prevOccasion).add(durationInSeconds, 's');
      if (isRunning) {
        return {
          timestamp: prevOccasionEnd.format('HH:mm'),
          interval: getDay(prevOccasionEnd),
        };
      }
      return {
        timestamp: nextOccasion.format('HH:mm'),
        interval: getDay(nextOccasion),
      };
    } catch (e) {
      return null;
    }
  }, [durationInSeconds, validCronInterval, isRunning]);

  return (
    <C.StartEnd>
      <S.TextSmall withBottomMargin>
        {isRunning ? (t('ends', 'asurgentui')) : (t('starts', 'asurgentui'))}
      </S.TextSmall>
      <Icons.Flag active={!isExpired && validCronInterval !== null} />
      {!isExpired && validCronInterval && occasion ? (
        <>
          <S.TextNormal>{occasion.timestamp}</S.TextNormal>
          <S.TextSmall>{occasion.interval}</S.TextSmall>
        </>
      ) : (
        <>
          <S.TextNormal>{t('naIcon', 'asurgentui')}</S.TextNormal>
          <S.TextSmall>{t('naText', 'asurgentui')}</S.TextSmall>
        </>
      )}
    </C.StartEnd>
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
};

StartEnd.defaultProps = {
  endDate: moment().add(1, 'week'),
  cronExpression: '* * * * *',
  durationInSeconds: 1800,
};

export default StartEnd;
