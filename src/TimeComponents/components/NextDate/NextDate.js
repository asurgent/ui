import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import parser from 'cron-parser';
import translation from './NextDate.translation';
import * as C from './NextDate.styled';
import * as S from '../../TimeComponents.styled';
import * as Icons from '../Icons';
import { parseMoment, getMonthYear } from '../../helpers';

const { t } = translation;

const NextDate = ({
  currentDate,
  endDate,
  cronExpression,
  durationInSeconds,
  ...props
}) => {
  const validCronInterval = useMemo(() => {
    try {
      return parser.parseExpression(cronExpression, { currentDate, endDate });
    } catch (e) {
      return false;
    }
  }, [cronExpression, currentDate, endDate]);

  const hasExpired = useMemo(() => (parseMoment(endDate) < moment()), [endDate]);

  const nextRun = useMemo(() => {
    try {
      const next = parseMoment(validCronInterval.next().toString());
      return next < parseMoment(endDate) ? next : null;
    } catch (e) {
      return null;
    }
  }, [endDate, validCronInterval]);

  const isRunning = useMemo(() => {
    try {
      const previous = parseMoment(validCronInterval.prev().toString());
      return previous.add(durationInSeconds, 'seconds') > moment();
    } catch (e) {
      return false;
    }
  },
  [durationInSeconds, validCronInterval]);

  if (!validCronInterval) {
    return (
      <C.Date data-testid="invalid-cron" {...props}>
        <S.TextSmall withBottomMargin>{t('nextDate', 'asurgentui')}</S.TextSmall>
        <C.ExpiredDate>
          <S.TextNormal>{t('naIcon', 'asurgentui')}</S.TextNormal>
          <S.TextSmall>{t('invalidCron', 'asurgentui')}</S.TextSmall>
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
          <S.TextSmall>{t('naText', 'asurgentui')}</S.TextSmall>
        </C.ExpiredDate>
      </C.Date>
    );
  }

  return (
    <C.Date {...props}>
      <S.TextSmall withBottomMargin>{t('nextDate', 'asurgentui')}</S.TextSmall>
      {isRunning ? (
        <>
          <Icons.Spinner />
          <S.TextSmall data-testid="is-running" withBottomMargin>{t('ongoing', 'asurgentui')}</S.TextSmall>
        </>
      ) : (
        <C.NextDate data-testid="next-run">
          <S.TextNormal>{parseMoment(nextRun).format('DD')}</S.TextNormal>
          <S.TextSmall>{getMonthYear(parseMoment(nextRun))}</S.TextSmall>
        </C.NextDate>
      )}
    </C.Date>
  );
};

NextDate.propTypes = {
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
  durationInSeconds: PropTypes.number,

};
NextDate.defaultProps = {
  currentDate: moment(),
  endDate: moment().add(1, 'week'),
  cronExpression: '* * * * *',
  durationInSeconds: 0,
};

export default NextDate;
