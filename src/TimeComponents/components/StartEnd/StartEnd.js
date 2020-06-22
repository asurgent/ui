import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import parser from 'cron-parser';
import * as C from './StartEnd.styled';
import * as S from '../../TimeComponents.styled';
import translation from './StartEnd.translation';
import * as Icons from '../Icons';

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
      return moment(validCronInterval.prev().toString());
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

  const isExpired = useMemo(() => moment(endDate) < moment(), [endDate]);

  const occasion = useMemo(() => {
    try {
      const prevOccasion = validCronInterval.prev().toString();
      const nextOccasion = validCronInterval.next().toString();
      if (isRunning) {
        return {
          timestamp: moment(prevOccasion).add(durationInSeconds, 's').format('HH:mm'),
          interval: moment(prevOccasion).add(durationInSeconds, 's').format('dddd'),
        };
      }
      return {
        timestamp: moment(nextOccasion).format('HH:mm'),
        interval: moment(nextOccasion).format('dddd'),
      };
    } catch (e) {
      return null;
    }
  }, [durationInSeconds, validCronInterval, isRunning]);

  return (
    <C.StartEnd>
      <S.TextSmall style={{ marginBottom: '1rem' }}>
        {isRunning ? (t('ends')) : (t('starts'))}
      </S.TextSmall>
      <Icons.Flag active={!isExpired && validCronInterval} />
      {!isExpired && validCronInterval ? (
        <>
          <S.TextNormal>{occasion.timestamp}</S.TextNormal>
          <S.TextSmall>{occasion.interval}</S.TextSmall>
        </>
      ) : (
        <>
          <S.TextNormal>{t('naIcon')}</S.TextNormal>
          <S.TextSmall>{t('naText')}</S.TextSmall>
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
