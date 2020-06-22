import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import parser from 'cron-parser';
import moment from 'moment';
import * as C from './Repeat.styled';
import translation from './Repeat.translation';
import * as S from '../../TimeComponents.styled';
import * as Icons from '../Icons';
import { getRepeatSign } from './helpers';

const { t } = translation;

const Repeat = ({ endDate, cronExpression }) => {
  const validCronInterval = useMemo(() => {
    try {
      return parser.parseExpression(cronExpression);
    } catch (e) {
      return null;
    }
  }, [cronExpression]);

  const isExpired = useMemo(() => moment(endDate) < moment(), [endDate]);

  const intervalInSeconds = useMemo(() => {
    try {
      const next = validCronInterval.next().toString();
      const prev = validCronInterval.prev().toString();
      return moment(next).diff(moment(prev), 'seconds');
    } catch (e) {
      return { short: t('naIcon', 'asurgentui'), long: t('naText', 'asurgentui') };
    }
  }, [validCronInterval]);


  return (
    <C.Repeat>
      <S.TextSmall style={{ marginBottom: '1rem' }}>{t('repeats')}</S.TextSmall>
      <Icons.Dots active={!isExpired} />
      {isExpired ? (
        <>
          <S.TextNormal>{t('zero')}</S.TextNormal>
          <S.TextSmall>{t('times')}</S.TextSmall>
        </>
      ) : (
        <>
          <S.TextNormal>{getRepeatSign(intervalInSeconds).short}</S.TextNormal>
          <S.TextSmall>{getRepeatSign(intervalInSeconds).long}</S.TextSmall>
        </>
      )}
    </C.Repeat>
  );
};

Repeat.propTypes = {
  endDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  cronExpression: PropTypes.string,
};

Repeat.defaultProps = {
  endDate: moment().add(1, 'week'),
  cronExpression: '* * * * *',
};

export default Repeat;
