import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withTheme } from 'styled-components';
import * as C from './DateSpan.styled';
import * as S from '../../TimeComponents.styled';
import translation from './DateSpan.translation';
import * as Icons from '../Icons';
import { getMonthYear } from '../../helpers';
import { newMoment } from '../../../Moment/momentParsers';

const { t } = translation;

const DateSpan = ({
  startDate,
  endDate,
  endDateThreshold,
  hasExpired,
  theme,
  ...props
}) => {
  const startDateValid = useMemo(() => newMoment(startDate).isValid(), [startDate]);
  const endDateValid = useMemo(() => newMoment(endDate).isValid(), [endDate]);

  const isNever = useMemo(() => {
    if (endDateValid) {
      return newMoment(endDate) > newMoment(endDateThreshold);
    }
    return null;
  }, [endDate, endDateThreshold, endDateValid]);

  const isActive = useMemo(() => newMoment(endDate) > moment(), [endDate]);

  return ((
    <C.Dates>
      <C.Container {...props}>
        <C.StartDate active={!hasExpired}>
          <S.TextNormal>{newMoment(startDate).format('DD')}</S.TextNormal>
          <S.TextSmall>
            {`${t(`month${newMoment(startDate).month()}`)} ${newMoment(startDate).format('YY')}`}
          </S.TextSmall>
        </C.StartDate>
        <C.Time>
          <S.TextSmall>
            {`${t(`day${newMoment(startDate).day()}`)} ${newMoment(startDate).format('hh:mm')}`}
          </S.TextSmall>
        </C.Time>
      </C.Container>

      <C.Container {...props}>
        <C.EndDate active={!hasExpired}>
          <S.TextNormal>{newMoment(endDate).format('DD')}</S.TextNormal>
          <S.TextSmall>
            {`${t(`month${newMoment(endDate).month()}`)} ${newMoment(endDate).format('YY')}`}
          </S.TextSmall>
        </C.EndDate>
        <C.Time>
          <S.TextSmall>
            {`${t(`day${newMoment(endDate).day()}`)} ${newMoment(endDate).format('hh:mm')}`}
          </S.TextSmall>
        </C.Time>
      </C.Container>
    </C.Dates>
  )
  /*   <C.Dates {...props}>
      <C.StartDate active={!hasExpired} theme={theme}>
        <S.TextNormal>{newMoment(startDate).format('DD')}</S.TextNormal>
        <S.TextSmall>{getMonthYear(newMoment(startDate))}</S.TextSmall>
      </C.StartDate>

      <C.EndDate active={!hasExpired} theme={theme}>
        <S.TextNormal>{newMoment(endDate).format('DD')}</S.TextNormal>
        <S.TextSmall>{getMonthYear(newMoment(endDate))}</S.TextSmall>
      </C.EndDate>
    </C.Dates> */
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

export default withTheme(DateSpan);
