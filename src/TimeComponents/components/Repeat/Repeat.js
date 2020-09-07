import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import parser from 'cron-parser';
import moment from 'moment';
import { withTheme } from 'styled-components';
import * as C from './Repeat.styled';
import translation from './Repeat.translation';
import * as S from '../../TimeComponents.styled';
import * as Icons from '../Icons';
import { newMoment } from '../../../Moment/momentParsers';
import { getRepeatInterval, getProgress } from './helpers';
import * as Progress from '../../../Progress';

const { t } = translation;

const Repeat = ({
  hasExpired,
  cronExpression,
  isOngoing,
  onGoingFrom,
  onGoingTo,
  useAnimation,
  showPercentage,
  theme,
}) => {
  const upcomingDates = useMemo(() => {
    try {
      const interval = parser.parseExpression(cronExpression);
      return {
        occasion1: newMoment(interval.next().toString()).toISOString(),
        occasion2: newMoment(interval.next().toString()).toISOString(),
      };
    } catch (err) {
      return null;
    }
  }, [cronExpression]);

  if (hasExpired) {
    return (
      <C.Container data-testid="expired" expired>
        <S.TextSmall withBottomMargin>{t('status', 'asurgentui')}</S.TextSmall>
        <S.TextNormal data-testid="short-label">{t('naIcon', 'asurgentui')}</S.TextNormal>
        <S.TextSmall style={{ marginTop: '0.7rem' }} data-testid="long-label">{t('expired', 'asurgentui')}</S.TextSmall>
      </C.Container>
    );
  }

  if (isOngoing) {
    return (
      <C.Container data-testid="progress">
        <S.TextSmall withBottomMargin>{t('status', 'asurgentui')}</S.TextSmall>
        <Progress.Ring
          radius={20}
          stroke={3}
          progress={getProgress(onGoingFrom, onGoingTo)}
          useShadow
          useAnimation={useAnimation}
          showPercentage={showPercentage}
        />
        <S.TextSmall withBottomMargin>{t('ongoing', 'asurgentui')}</S.TextSmall>
      </C.Container>
    );
  }

  if (upcomingDates) {
    const label = getRepeatInterval(
      upcomingDates.occasion1,
      upcomingDates.occasion2,
    );

    return (
      <C.Container>
        <S.TextSmall withBottomMargin>{t('repeats', 'asurgentui')}</S.TextSmall>
        <Icons.Dots theme={theme} />
        <S.TextNormal data-testid={label.short}>{t(label.short, 'asurgentui')}</S.TextNormal>
        <S.TextSmall data-testid={label.long}>{t(label.long, 'asurgentui')}</S.TextSmall>
      </C.Container>
    );
  }
  return null;
};

Repeat.propTypes = {
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
  cronExpression: PropTypes.string,
  useAnimation: PropTypes.bool,
  showPercentage: PropTypes.bool,
  theme: PropTypes.instanceOf(Object),
  isOngoing: PropTypes.bool.isRequired,
  hasExpired: PropTypes.bool.isRequired,
};

Repeat.defaultProps = {
  onGoingFrom: null,
  onGoingTo: null,
  cronExpression: null,
  useAnimation: true,
  showPercentage: true,
  theme: {},
};

export default withTheme(Repeat);
