import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatTextNumber } from './helpers';
import * as C from '../../TimeComponents.styled';
import translation from './StartEnd.translation';
import * as Icons from '../Icons';
import * as ToolTip from '../../../Tooltip';

const { t } = translation;

const propTypes = {
  isOnGoing: PropTypes.bool.isRequired,
  hasExpired: PropTypes.bool.isRequired,
  showDurationToolTip: PropTypes.bool.isRequired,
  theme: PropTypes.instanceOf(Object).isRequired,
  durationInSeconds: PropTypes.number.isRequired,
};

const Duration = ({
  hasExpired, theme, durationInSeconds, showDurationToolTip, isOnGoing,
}) => {
  const text = useMemo(() => {
    if (isOnGoing) {
      return 'remaining';
    }
    return hasExpired ? 'lasted' : 'duration';
  }, [hasExpired, isOnGoing]);

  if (showDurationToolTip) {
    return (
      <ToolTip.Middle tip={`${durationInSeconds} ${t('seconds', 'asurgentui')}`}>
        <C.Container hasExpired={hasExpired} marginRight marginLeft>
          <C.TextSmall withBottomMargin>{t(text, 'asurgentui')}</C.TextSmall>
          <Icons.Duration active={!hasExpired} theme={theme} />
          <C.TextNormal>{formatTextNumber(durationInSeconds)[0]}</C.TextNormal>
          <C.TextSmall withBottomMargin>
            {formatTextNumber(durationInSeconds)[1]}
          </C.TextSmall>
        </C.Container>
      </ToolTip.Middle>
    );
  }

  return (
    <C.Container hasExpired={hasExpired} marginRight marginLeft>
      <C.TextSmall withBottomMargin>{t(text, 'asurgentui')}</C.TextSmall>
      <Icons.Duration active={!hasExpired} theme={theme} />
      <C.TextNormal>{formatTextNumber(durationInSeconds)[0]}</C.TextNormal>
      <C.TextSmall withBottomMargin>
        {formatTextNumber(durationInSeconds)[1]}
      </C.TextSmall>
    </C.Container>
  );
};

Duration.propTypes = propTypes;

export default Duration;
