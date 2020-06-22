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
  const validInterval = useMemo(() => {
    try {
      return parser.parseExpression(cronExpression);
    } catch (e) {
      return null;
    }
  }, [cronExpression]);

  const previousOccasion = useMemo(() => (moment(validInterval?.prev().toString())), [validInterval]);

  const isRunning = useMemo(() => (
    validInterval ? previousOccasion.add(durationInSeconds, 'seconds') > moment() : false
  ), [durationInSeconds, validInterval, previousOccasion]);

  const isExpired = useMemo(() => moment(endDate) < moment(), [endDate]);

  const occasion = useMemo(() => {
    const prevOccasion = validInterval?.prev().toString();
    const nextOccasion = validInterval?.next().toString();
    console.log('prevOccasion', prevOccasion);
    console.log('nextOccasion', nextOccasion);
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
  }, [durationInSeconds, validInterval, isRunning]);

  return (
    <C.StartEnd>
      <S.TextSmall style={{ marginBottom: '1rem' }}>{isRunning ? (t('ends')) : (t('starts'))}</S.TextSmall>
      <Icons.Flag active={!isExpired && validInterval} />
      {!isExpired && validInterval ? (
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
  endDate: PropTypes.string,
  cronExpression: PropTypes.string,
  durationInSeconds: PropTypes.number,

};
StartEnd.defaultProps = {
  endDate: null,
  cronExpression: null,
  durationInSeconds: null,
};


export default StartEnd;
