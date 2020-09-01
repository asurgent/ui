import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import parser from 'cron-parser';
import moment from 'moment';
import withTheme from 'high-order-components/withTheme';
import * as C from '../Repeat/Repeat.styled';
import translation from './Duration.translation';
import * as S from '../../TimeComponents.styled';
import * as Icons from '../Icons';
import { getTimestamp } from './helpers';
import { parseMoment } from '../../helpers';

const { t } = translation;

const Duration = ({
  cronExpression, durationInSeconds, endDate, currentDate, ...props
}) => {
  const validCronInterval = useMemo(() => {
    try {
      return parser.parseExpression(cronExpression, { currentDate, endDate });
    } catch (e) {
      return false;
    }
  }, [cronExpression, currentDate, endDate]);

  const previousOccasion = useMemo(() => (
    validCronInterval ? parseMoment(validCronInterval.prev().toString()) : null
  ), [validCronInterval]);

  const isRunning = useMemo(() => (
    validCronInterval ? previousOccasion.add(durationInSeconds, 'seconds') > moment() : false
  ), [durationInSeconds, previousOccasion, validCronInterval]);

  const timestamp = useMemo(() => (
    validCronInterval ? getTimestamp(durationInSeconds, previousOccasion, isRunning) : null
  ), [durationInSeconds, isRunning, previousOccasion, validCronInterval]);

  if (!validCronInterval) {
    return (
      <C.Repeat {...props}>
        <S.TextSmall withBottomMargin data-testid="invalid-cron">
          {t('duration', 'asurgentui') }
        </S.TextSmall>
        <Icons.Duration active={false} />
        <S.TextNormal>{t('naIcon', 'asurgentui')}</S.TextNormal>
        <S.TextSmall>{t('invalid', 'asurgentui')}</S.TextSmall>
      </C.Repeat>
    );
  }

  return (
    <C.Repeat {...props}>
      {isRunning ? (
        <S.TextSmall withBottomMargin data-testid="remaining">
          {t('remaining', 'asurgentui') }
        </S.TextSmall>
      ) : (
        <S.TextSmall withBottomMargin data-testid="duration">
          { t('duration', 'asurgentui') }
        </S.TextSmall>
      )}
      <Icons.Duration active={parseMoment(endDate) > moment()} />
      <S.TextNormal data-testid="time-value">{timestamp?.value}</S.TextNormal>
      <S.TextSmall data-testid="time-label">{timestamp?.label}</S.TextSmall>
    </C.Repeat>
  );
};

Duration.propTypes = {
  cronExpression: PropTypes.string,
  durationInSeconds: PropTypes.number,
  currentDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  endDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
};

Duration.defaultProps = {
  cronExpression: '* * * * *',
  durationInSeconds: 0,
  endDate: moment().add(1, 'year'),
  currentDate: moment(),
};

export default withTheme()(Duration);
