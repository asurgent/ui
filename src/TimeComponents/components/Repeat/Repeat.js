import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withTheme } from 'styled-components';
import translation from './Repeat.translation';
import * as C from '../../TimeComponents.styled';
import * as Icons from '../Icons';
import { getProgress } from './helpers';
import * as Progress from '../../../Progress';

const { t } = translation;

const Repeat = ({
  hasExpired,
  isOngoing,
  onGoingFrom,
  onGoingTo,
  useAnimation,
  showPercentage,
  nextExecution,
  cronCategory,
  theme,
}) => {
  if (hasExpired) {
    return (
      <C.Container hasExpired data-testid="expired">
        <C.TextSmall style={{ marginBottom: '1rem' }}>{t('status', 'asurgentui')}</C.TextSmall>
        <C.TextNormal data-testid="short-label">{t('naIcon', 'asurgentui')}</C.TextNormal>
        <C.TextSmall style={{ marginTop: '1rem' }} data-testid="long-label">{t('expired', 'asurgentui')}</C.TextSmall>
      </C.Container>
    );
  }

  if (isOngoing) {
    return (
      <C.Container data-testid="progress">
        <C.TextSmall style={{ marginBottom: '0.5rem' }}>{t('status', 'asurgentui')}</C.TextSmall>
        <Progress.Ring
          radius={20}
          stroke={2}
          progress={getProgress(onGoingFrom, onGoingTo)}
          useShadow
          useAnimation={useAnimation}
          showPercentage={showPercentage}
        />
        <C.TextSmall withBottomMargin>{t('ongoing', 'asurgentui')}</C.TextSmall>
      </C.Container>
    );
  }

  if (nextExecution) {
    return (
      <C.Container data-testid="repeats">
        <C.TextSmall withBottomMargin>{t('repeats', 'asurgentui')}</C.TextSmall>
        <Icons.Dots theme={theme} />
        <C.TextNormal data-testid={cronCategory}>{t(`${cronCategory}Short`, 'asurgentui')}</C.TextNormal>
        <C.TextSmall>{t(`${cronCategory}Long`, 'asurgentui')}</C.TextSmall>
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
  nextExecution: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  cronCategory: PropTypes.string,
  useAnimation: PropTypes.bool,
  showPercentage: PropTypes.bool,
  theme: PropTypes.instanceOf(Object),
  isOngoing: PropTypes.bool.isRequired,
  hasExpired: PropTypes.bool.isRequired,
};

Repeat.defaultProps = {
  onGoingFrom: null,
  onGoingTo: null,
  nextExecution: null,
  cronCategory: null,
  useAnimation: false,
  showPercentage: false,
  theme: {},
};

export default withTheme(Repeat);
