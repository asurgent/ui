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

const Repeat = ({ cronExpression }) => {
  const typeOfRepeat = useMemo(() => {
    try {
      const interval = parser.parseExpression(cronExpression);
      const next = interval.next().toString();
      const prev = interval.prev().toString();
      const intervalInSeconds = moment(next).diff(moment(prev), 'seconds');
      return getRepeatSign(intervalInSeconds);
    } catch (e) {
      return { short: t('naIcon', 'asurgentui'), long: t('naText', 'asurgentui') };
    }
  }, [cronExpression]);

  return (
    <C.Repeat>
      <S.TextSmall style={{ marginBottom: '1rem' }}>{t('repeats')}</S.TextSmall>
      <Icons.Dots />
      <S.TextNormal>{typeOfRepeat?.short}</S.TextNormal>
      <S.TextSmall>{typeOfRepeat?.long}</S.TextSmall>
    </C.Repeat>
  );
};

Repeat.propTypes = {
  cronExpression: PropTypes.string.isRequired,
};

export default Repeat;
