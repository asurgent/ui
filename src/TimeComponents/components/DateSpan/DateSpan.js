import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withTheme } from 'styled-components';
import * as C from './DateSpan.styled';
import * as S from '../../TimeComponents.styled';
import translation from './DateSpan.translation';

import { newMoment } from '../../../Moment/momentParsers';

const { t } = translation;

const DateSpan = ({
  startDate,
  endDate,
  hasExpired,
  theme,
}) => ((
  <C.Dates>
    <C.Container>
      <C.StartDate active={!hasExpired} theme={theme}>
        <S.TextNormal>{newMoment(startDate).format('DD')}</S.TextNormal>
        <S.TextSmall>
          {`${t(`month${newMoment(startDate).month()}`)} ${newMoment(startDate).format('YY')}`}
        </S.TextSmall>
      </C.StartDate>
      <C.Time>
        <S.TextSmall>
          {`${t(`day${newMoment(startDate).day()}`)} ${newMoment(startDate).format('HH:mm')}`}
        </S.TextSmall>
      </C.Time>
    </C.Container>

    <C.Container>
      <C.EndDate active={!hasExpired} theme={theme}>
        <S.TextNormal>{newMoment(endDate).format('DD')}</S.TextNormal>
        <S.TextSmall>
          {`${t(`month${newMoment(endDate).month()}`)} ${newMoment(endDate).format('YY')}`}
        </S.TextSmall>
      </C.EndDate>
      <C.Time>
        <S.TextSmall>
          {`${t(`day${newMoment(endDate).day()}`)} ${newMoment(endDate).format('HH:mm')}`}
        </S.TextSmall>
      </C.Time>
    </C.Container>
  </C.Dates>
)

);

DateSpan.propTypes = {
  hasExpired: PropTypes.bool.isRequired,
  startDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  endDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  theme: PropTypes.instanceOf(Object),
};
DateSpan.defaultProps = {
  startDate: null,
  endDate: null,
  theme: {},
};

export default withTheme(DateSpan);
