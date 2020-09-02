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
import { getRepeatInterval } from './helpers';

const { t } = translation;
console.clear();
const Repeat = ({
  cronExpression,
  isOngoing,
  nextDate,
  hasExpired,
  onGoingFrom,
  onGoingTo,
  durationInSeconds,
  theme,
}) => {
  const firstUpcoming = useMemo(() => {
    try {
      const interval = parser.parseExpression(cronExpression, { currentDate: moment(nextDate) });
      return moment(interval.next().toString());
    } catch (e) {
      return null;
    }
  }, [cronExpression, nextDate]);

  const difference = useMemo(() => {
    try {
      return moment(nextDate).diff(firstUpcoming, 'seconds');
    } catch (e) {
      console.log('err', e);
      return null;
    }
  }, [firstUpcoming, nextDate]);

  // invalid cron, return nothing
  if (!firstUpcoming) {
    return null;
  }

  console.log('nextdate', moment(nextDate).toString());
  console.log('firstUpcoming', moment(firstUpcoming).toString());
  // ongoing, return spinner
  if (isOngoing) {
    return (
      <C.Container>
        <S.TextSmall withBottomMargin>{t('status', 'asurgentui')}</S.TextSmall>
        <S.TextNormal>{}</S.TextNormal>
        {/* <Icons.Spinner style={{ marginBottom: '0.4rem' }} /> */}
        <S.TextSmall data-testid="is-running" withBottomMargin>{t('ongoing', 'asurgentui')}</S.TextSmall>
      </C.Container>
    );
  }

  if (hasExpired) {
    return (
      <C.Container data-testid="repeat" expired>
        <S.TextSmall withBottomMargin>{t('status', 'asurgentui')}</S.TextSmall>
        <S.TextNormal data-testid="short-label">{t('naIcon', 'asurgentui')}</S.TextNormal>
        <S.TextSmall style={{ marginTop: '0.7rem' }} data-testid="long-label">{t('expired', 'asurgentui')}</S.TextSmall>
      </C.Container>
    );
  }
  const label = getRepeatInterval(difference);
  return (
    <C.Container data-testid="repeat">
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
};

Repeat.defaultProps = {
  currentDate: moment(),
  endDate: moment().add(1, 'week'),
  cronExpression: '* * * * *',
};

export default withTheme(Repeat);
