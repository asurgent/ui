import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import parser from 'cron-parser';
import moment from 'moment';
import * as C from '../Repeat/Repeat.styled';
import translation from './Duration.translation';
import * as S from '../../TimeComponents.styled';
import * as Icons from '../Icons';
import { getTimestamp } from './helpers';

const { t } = translation;

const Duration = ({ cronExpression, durationInSeconds, endDate }) => {
  const validCronInterval = useMemo(() => {
    try {
      return parser.parseExpression(cronExpression);
    } catch (e) {
      return false;
    }
  }, [cronExpression]);

  const previousOccasion = useMemo(() => (
    validCronInterval ? validCronInterval.prev().toString() : null
  ), [validCronInterval]);

  const isRunning = useMemo(() => (
    validCronInterval ? moment(previousOccasion).add(durationInSeconds, 'seconds') > moment() : false
  ), [durationInSeconds, previousOccasion, validCronInterval]);

  const timestamp = useMemo(() => (
    validCronInterval ? getTimestamp(durationInSeconds, previousOccasion, isRunning) : null
  ), [durationInSeconds, isRunning, previousOccasion, validCronInterval]);


  return (
    <C.Repeat>
      <S.TextSmall withBottomMargin>
        { isRunning ? t('remaining', 'asurgentui') : t('duration', 'asurgentui') }
      </S.TextSmall>
      <Icons.Duration active={moment(endDate) > moment()} />
      {validCronInterval ? (
        <>
          <S.TextNormal>{timestamp?.value}</S.TextNormal>
          <S.TextSmall>{timestamp?.label}</S.TextSmall>
        </>
      ) : (
        <>
          <S.TextNormal>{t('cron', 'asurgentui')}</S.TextNormal>
          <S.TextSmall>{t('invalid', 'asurgentui')}</S.TextSmall>
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
