import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as C from './DateSpan.styled';
import * as S from '../../TimeComponents.styled';
import translation from './DateSpan.translation';
import * as Icons from '../Icons';
import { parseMoment, getMonthYear } from '../../helpers';

const { t } = translation;

const DateSpan = ({
  startDate,
  endDate,
  endDateThreshold,
}) => {
  const startDateValid = useMemo(() => parseMoment(startDate).isValid(), [startDate]);
  const endDateValid = useMemo(() => parseMoment(endDate).isValid(), [endDate]);

  const isNever = useMemo(() => {
    if (endDateValid) {
      return parseMoment(endDate) > parseMoment(endDateThreshold);
    }
    return null;
  }, [endDate, endDateThreshold, endDateValid]);

  const isActive = useMemo(() => parseMoment(endDate) > moment(), [endDate]);

  return (
    <C.Dates>
      <C.Date>
        <S.TextSmall withBottomMargin>{t('startDate', 'asurgentui')}</S.TextSmall>
        <C.StartDate active={isActive && startDateValid}>
          {startDateValid ? (
            <>
              <S.TextNormal>{parseMoment(startDate).format('DD')}</S.TextNormal>
              <S.TextSmall>{getMonthYear(parseMoment(startDate))}</S.TextSmall>
            </>
          ) : (
            <>
              <S.TextNormal>{t('naIcon', 'asurgentui')}</S.TextNormal>
              <S.TextSmall>{t('invalid', 'asurgentui')}</S.TextSmall>
            </>
          )}
        </C.StartDate>
      </C.Date>
      <C.Dots>
        <Icons.Dots active={false} />
      </C.Dots>
      <C.Date>
        <S.TextSmall withBottomMargin>{t('endDate', 'asurgentui')}</S.TextSmall>
        {endDateValid ? (
          <C.EndDate active={isActive && endDateValid}>
            {isNever ? (
              <>
                <S.TextNormal>{t('naIcon', 'asurgentui')}</S.TextNormal>
                <S.TextSmall>{t('never', 'asurgentui')}</S.TextSmall>
              </>
            ) : (
              <>
                <S.TextNormal>{parseMoment(endDate).format('DD')}</S.TextNormal>
                <S.TextSmall>{getMonthYear(parseMoment(endDate))}</S.TextSmall>
              </>
            )}
          </C.EndDate>
        ) : (
          <C.EndDate active={false}>
            <S.TextNormal>{t('naIcon', 'asurgentui')}</S.TextNormal>
            <S.TextSmall>{t('invalid', 'asurgentui')}</S.TextSmall>
          </C.EndDate>
        )}
      </C.Date>
    </C.Dates>
  );
};

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
