import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as C from './DateAndTime.styled';
import * as S from '../../TimeComponents.styled';
import translation from './DateAndTime.translation';
import { parseMoment, getMonthYear } from '../../helpers';

const { t } = translation;

const DateAndTime = ({ date }) => {
  const dateValid = useMemo(() => parseMoment(date).isValid(), [date]);

  if (dateValid) {
    return (
      <C.Date>
        <C.DateAndTime>
          <S.TextNormal>{t('naIcon', 'asurgentui')}</S.TextNormal>
          <S.TextSmall>{t('invalid', 'asurgentui')}</S.TextSmall>
        </C.DateAndTime>
      </C.Date>
    );
  }
  return (
    <C.Date>
      <C.DateAndTime>
        <S.TextNormal>{parseMoment(date).format('DD')}</S.TextNormal>
        <S.TextSmall>{getMonthYear(parseMoment(date))}</S.TextSmall>
      </C.DateAndTime>
      <div><S.TextSmall>wed 23:00</S.TextSmall></div>
    </C.Date>
  );
};

DateAndTime.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
};
DateAndTime.defaultProps = {
  date: null,
};

export default DateAndTime;
