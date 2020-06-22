import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import parser from 'cron-parser';
import moment from 'moment';
import * as C from '../Repeat/Repeat.styled';
import translation from './Duration.translation';
import * as S from '../../TimeComponents.styled';
import * as Icons from '../Icons';
import { getTimestamp } from '../helpers';

const { t } = translation;

const Duration = ({ cronExpression, durationInSeconds, endDate }) => {
  const interval = useMemo(() => {
    try {
      return parser.parseExpression(cronExpression);
    } catch (e) {
      return false;
    }
  }, [cronExpression]);

  const previousOccasion = useMemo(() => (
    interval ? interval.prev().toString() : null
  ), [interval]);

  const isRunning = useMemo(() => (
    interval ? moment(previousOccasion).add(durationInSeconds, 'seconds') > moment() : false
  ), [durationInSeconds, interval, previousOccasion]);

  const timestamp = useMemo(() => (
    interval ? getTimestamp(durationInSeconds, previousOccasion, isRunning) : null
  ), [durationInSeconds, interval, isRunning, previousOccasion]);


  return (
    <C.Repeat>
      <S.TextSmall style={{ marginBottom: '1rem' }}>
        { isRunning ? t('remaining') : t('duration') }
      </S.TextSmall>
      <Icons.Duration active={moment(endDate) > moment()} />
      {interval ? (
        <>
          <S.TextNormal>{timestamp?.number}</S.TextNormal>
          <S.TextSmall>{timestamp?.description}</S.TextSmall>
        </>
      ) : (
        <>
          <S.TextNormal>{t('cron')}</S.TextNormal>
          <S.TextSmall>{t('invalid')}</S.TextSmall>
        </>
      )}
    </C.Repeat>
  );
};

Duration.propTypes = {
  cronExpression: PropTypes.string,
  durationInSeconds: PropTypes.number,
  endDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
};

Duration.defaultProps = {
  cronExpression: '* * * * *',
  durationInSeconds: 0,
  endDate: moment(),
};

export default Duration;
