// isongoing, isexpired, or compute
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import parser from 'cron-parser';
import moment from 'moment';
import { withTheme } from 'styled-components';
import * as C from './Repeat.styled';
import translation from './Repeat.translation';
import * as S from '../../TimeComponents.styled';
import * as Icons from '../Icons';
import { parseMoment } from '../../helpers';
import { newMoment } from '../../../Moment/momentParsers';
import { getRepeatInterval } from './helpers';
import * as Progress from '../../../Progress';

const { t } = translation;
console.clear();
const Repeat = ({
  startDate,
  endDate,
  cronExpression,
  isOngoing,
  nextDate,
  hasExpired,
  onGoingFrom,
  onGoingTo,
  durationInSeconds,
  useAnimation,
  showPercentage,
  theme,
}) => {
  const firstUpcoming = useMemo(() => {
    try {
      const interval = parser.parseExpression(cronExpression, { currentDate: newMoment(nextDate) });
      return newMoment(interval.next().toString());
    } catch (e) {
      console.log('error', e);
      return null;
    }
  }, [cronExpression, nextDate]);

  const difference = useMemo(() => {
    try {
      return newMoment(nextDate).diff(firstUpcoming, 'seconds');
    } catch (e) {
      console.log('err', e);
      return null;
    }
  }, [firstUpcoming, nextDate]);

  const percentageLeft = useMemo(() => {
    if (isOngoing) {
      const diffStartEnd = newMoment(onGoingTo).diff(newMoment(onGoingFrom), 'seconds');
      const diffNowEnd = newMoment(onGoingTo).diff(newMoment(), 'seconds');
      const percentage = ((diffStartEnd - diffNowEnd) / diffStartEnd) * 100;
      return percentage;
    }
    return null;
  }, [isOngoing, onGoingFrom, onGoingTo]);

  // ongoing, return spinner
  if (isOngoing) {
    return (
      <C.Container data-testid="progress">
        <S.TextSmall withBottomMargin>{t('status', 'asurgentui')}</S.TextSmall>
        <Progress.Ring
          radius={20}
          stroke={3}
          progress={percentageLeft}
          useShadow
          useAnimation={useAnimation}
          showPercentage={showPercentage}
        />
        <S.TextSmall withBottomMargin>{t('ongoing', 'asurgentui')}</S.TextSmall>
      </C.Container>
    );
  }

  if (hasExpired) {
    return (
      <C.Container data-testid="expired" expired>
        <S.TextSmall withBottomMargin>{t('status', 'asurgentui')}</S.TextSmall>
        <S.TextNormal data-testid="short-label">{t('naIcon', 'asurgentui')}</S.TextNormal>
        <S.TextSmall style={{ marginTop: '0.7rem' }} data-testid="long-label">{t('expired', 'asurgentui')}</S.TextSmall>
      </C.Container>
    );
  }
  const label = getRepeatInterval(difference);
  return (
    <C.Container>
      <S.TextSmall withBottomMargin>{t('repeats', 'asurgentui')}</S.TextSmall>
      <Icons.Dots theme={theme} />
      <S.TextNormal data-testid={label.short}>{t(label.short, 'asurgentui')}</S.TextNormal>
      <S.TextSmall data-testid={label.long}>{t(label.long, 'asurgentui')}</S.TextSmall>
    </C.Container>
  );
};

Repeat.propTypes = {
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
  cronExpression: PropTypes.string,
  useAnimation: PropTypes.bool,
  showPercentage: PropTypes.bool,
};

Repeat.defaultProps = {
  currentDate: newMoment(),
  endDate: newMoment().add(1, 'week'),
  cronExpression: '* * * * *',
  useAnimation: true,
  showPercentage: true,
};

export default withTheme(Repeat);
