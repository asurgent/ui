import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as C from './DateSpan.styled';
import * as S from '../../TimeComponents.styled';
import translation from './DateSpan.translation';
import * as Icons from '../Icons';

const { t } = translation;

const DateSpan = ({
  startDate,
  endDate,
  endDateThreshold,
}) => (
  <C.Dates>
    <C.Date>
      <S.TextSmall style={{ marginBottom: '1rem' }}>{t('startDate')}</S.TextSmall>
      <C.StartDate>
        <S.TextNormal>{moment(startDate).format('DD')}</S.TextNormal>
        <S.TextSmall>{moment(startDate).format('MMM YY')}</S.TextSmall>
      </C.StartDate>
    </C.Date>
    <C.Dots>
      <Icons.Dots active={false} />
    </C.Dots>
    <C.Date>
      <S.TextSmall style={{ marginBottom: '1rem' }}>{t('startDate')}</S.TextSmall>
      {moment(endDate) < moment(endDateThreshold) ? (
        <C.EndDate>
          <S.TextNormal>{moment(endDate).format('DD')}</S.TextNormal>
          <S.TextSmall>{moment(endDate).format('MMM YY')}</S.TextSmall>
        </C.EndDate>
      ) : (
        <C.EndDate>
          <S.TextNormal>{t('naIcon')}</S.TextNormal>
          <S.TextSmall>{t('never')}</S.TextSmall>
        </C.EndDate>
      )}
    </C.Date>
  </C.Dates>
);

DateSpan.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  endDateThreshold: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
};
DateSpan.defaultProps = {
  startDate: null,
  endDate: null,
  endDateThreshold: moment().add(10, 'years'),
};


export default DateSpan;
