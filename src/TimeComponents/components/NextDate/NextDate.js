import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import parser from 'cron-parser';
import translation from './NextDate.translation';
import * as C from './NextDate.styled';
import * as S from '../../TimeComponents.styled';
import * as Icons from '../Icons';
import { getMonthYear } from '../../helpers';

const { t } = translation;


const NextDate = ({
  endDate,
  cronExpression,
  durationInSeconds,
}) => {
  const validCronInterval = useMemo(() => {
    try {
      return parser.parseExpression(cronExpression);
    } catch (e) {
      return false;
    }
  }, [cronExpression]);

  const hasExpired = useMemo(() => (moment(endDate) < moment()), [endDate]);

  const nextRun = useMemo(() => {
    try {
      const next = validCronInterval.next().toString();
      return moment(next) < moment(endDate) ? moment(next) : null;
    } catch (e) {
      return null;
    }
  }, [endDate, validCronInterval]);

  const isRunning = useMemo(() => {
    try {
      const previous = validCronInterval.prev().toString();
      return moment(previous).add(durationInSeconds, 'seconds') > moment();
    } catch (e) {
      return false;
    }
  }, [validCronInterval, durationInSeconds]);


  if (!validCronInterval) {
    return (
      <C.Date>
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
      <C.Date>
        <S.TextSmall withBottomMargin>{t('nextDate', 'asurgentui')}</S.TextSmall>
        <C.ExpiredDate>
          <S.TextNormal>{t('naIcon', 'asurgentui')}</S.TextNormal>
          <S.TextSmall>{t('naText', 'asurgentui')}</S.TextSmall>
        </C.ExpiredDate>
      </C.Date>
    );
  }

  return (
    <C.Date>
      <S.TextSmall withBottomMargin>{t('nextDate', 'asurgentui')}</S.TextSmall>
      {isRunning ? (
        <>
          <Icons.Spinner />
          <S.TextSmall withBottomMargin>{t('ongoing', 'asurgentui')}</S.TextSmall>
        </>
      ) : (
        <>
          {nextRun ? (
            <C.NextDate>
              <S.TextNormal>{moment(nextRun).format('DD')}</S.TextNormal>
              <S.TextSmall>{getMonthYear(moment(nextRun))}</S.TextSmall>
            </C.NextDate>
          ) : (
            <C.ExpiredDate>
              <S.TextNormal>{t('naIcon', 'asurgentui')}</S.TextNormal>
              <S.TextSmall>{t('naText', 'asurgentui')}</S.TextSmall>
            </C.ExpiredDate>
          )}
        </>
      )}
    </C.Date>
  );
};

NextDate.propTypes = {
  endDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  cronExpression: PropTypes.string,
  durationInSeconds: PropTypes.number,

};
NextDate.defaultProps = {
  endDate: moment().add(1, 'week'),
  cronExpression: '* * * * *',
  durationInSeconds: 0,
};


export default NextDate;
