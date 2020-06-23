import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import parser from 'cron-parser';
import moment from 'moment';
import * as C from './Repeat.styled';
import translation from './Repeat.translation';
import * as S from '../../TimeComponents.styled';
import * as Icons from '../Icons';
import { getRepeatInterval } from './helpers';
import { parseMoment } from '../../helpers';

const { t } = translation;

const Repeat = ({ endDate, cronExpression }) => {
  const validCronInterval = useMemo(() => {
    try {
      return parser.parseExpression(cronExpression);
    } catch (e) {
      return null;
    }
  }, [cronExpression]);

  const isExpired = useMemo(() => parseMoment(endDate) < moment(), [endDate]);

  const intervalInSeconds = useMemo(() => {
    try {
      const next = parseMoment(validCronInterval.next().toString());
      const prev = parseMoment(validCronInterval.prev().toString());
      return next.diff(prev, 'seconds');
    } catch (e) {
      return { short: t('naIcon', 'asurgentui'), long: t('naText', 'asurgentui') };
    }
  }, [validCronInterval]);

  const repeatLabel = getRepeatInterval(intervalInSeconds);

  return (
    <C.Repeat>
      <S.TextSmall withBottomMargin>{t('repeats')}</S.TextSmall>
      <Icons.Dots active={!isExpired} />
      {isExpired ? (
        <>
          <S.TextNormal>{t('zero', 'asurgentui')}</S.TextNormal>
          <S.TextSmall>{t('times', 'asurgentui')}</S.TextSmall>
        </>
      ) : (
        <>
          <S.TextNormal>{repeatLabel.short}</S.TextNormal>
          <S.TextSmall>{repeatLabel.long}</S.TextSmall>
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
