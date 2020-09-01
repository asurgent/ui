/*
if ongoing: show spinner
if has a next date: show next date,
if cron but from/to is in the past: show Ø expired
if one time thing that's in the past (no cron): show Ø NA
*/

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import translation from './NextDate.translation';
import * as C from './NextDate.styled';
import * as S from '../../TimeComponents.styled';
import * as Icons from '../Icons';
import { parseMoment, getMonthYear } from '../../helpers';

const { t } = translation;

const NextDate = ({
  cronExpression,
  isOngoing,
  nextDate,
  hasExpired,
  ...props
}) => {
  const isRecurring = useMemo(() => cronExpression !== null || cronExpression !== '', [cronExpression]);

  // If ongoing show spinner
  if (isOngoing) {
    return (
      <C.Date {...props}>
        <S.TextSmall withBottomMargin>{t('nextDate', 'asurgentui')}</S.TextSmall>
        <Icons.Spinner />
        <S.TextSmall data-testid="is-running" withBottomMargin>{t('ongoing', 'asurgentui')}</S.TextSmall>
      </C.Date>
    );
  }

  // If not recurring, next date N/A
  if (!isRecurring) {
    return (
      <C.Date data-testid="expired" {...props}>
        <S.TextSmall withBottomMargin>{t('nextDate', 'asurgentui')}</S.TextSmall>
        <C.ExpiredDate>
          <S.TextNormal>{t('naIcon', 'asurgentui')}</S.TextNormal>
          <S.TextSmall>{t('naText', 'asurgentui')}</S.TextSmall>
        </C.ExpiredDate>
      </C.Date>
    );
  }

  if (hasExpired) {
    return (
      <C.Date data-testid="expired" {...props}>
        <S.TextSmall withBottomMargin>{t('nextDate', 'asurgentui')}</S.TextSmall>
        <C.ExpiredDate>
          <S.TextNormal>{t('naIcon', 'asurgentui')}</S.TextNormal>
          <S.TextSmall>{t('exired', 'asurgentui')}</S.TextSmall>
        </C.ExpiredDate>
      </C.Date>
    );
  }

  return (
    <C.Date {...props}>
      <S.TextSmall withBottomMargin>{t('nextDate', 'asurgentui')}</S.TextSmall>
      <C.NextDate data-testid="next-run">
        <S.TextNormal>{parseMoment(nextDate).format('DD')}</S.TextNormal>
        <S.TextSmall>{getMonthYear(parseMoment(nextDate))}</S.TextSmall>
      </C.NextDate>
    </C.Date>
  );
};

NextDate.propTypes = {
  isOngoing: PropTypes.bool,
  hasExpired: PropTypes.bool,
  nextDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  cronExpression: PropTypes.string,
};
NextDate.defaultProps = {
  isOngoing: null,
  hasExpired: null,
  nextDate: null,
  cronExpression: null,
};

export default NextDate;
