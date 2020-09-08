import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withTheme } from 'styled-components';
import * as C from '../../TimeComponents.styled';
import translation from './DateSpan.translation';
import { newMoment } from '../../../Moment/momentParsers';

const { t } = translation;

const Datespan = ({
  startDate,
  endDate,
  hasExpired,
  theme,
}) => ((
  <C.Dates>
    <C.Container hasExpired={hasExpired}>
      <C.StartDate active={!hasExpired} theme={theme}>
        <C.TextNormal>{newMoment(startDate).format('DD')}</C.TextNormal>
        <C.TextSmall>
          {`${t(`month${newMoment(startDate).month()}`)} ${newMoment(startDate).format('YY')}`}
        </C.TextSmall>
      </C.StartDate>
      <C.Time>
        <C.TextSmall>
          {`${t(`day${newMoment(startDate).day()}`)} ${newMoment(startDate).format('HH:mm')}`}
        </C.TextSmall>
      </C.Time>
    </C.Container>

    <C.Container hasExpired={hasExpired}>
      <C.EndDate active={!hasExpired} theme={theme}>
        <C.TextNormal>{newMoment(endDate).format('DD')}</C.TextNormal>
        <C.TextSmall>
          {`${t(`month${newMoment(endDate).month()}`)} ${newMoment(endDate).format('YY')}`}
        </C.TextSmall>
      </C.EndDate>
      <C.Time>
        <C.TextSmall>
          {`${t(`day${newMoment(endDate).day()}`)} ${newMoment(endDate).format('HH:mm')}`}
        </C.TextSmall>
      </C.Time>
    </C.Container>
  </C.Dates>
)

);

Datespan.propTypes = {
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
Datespan.defaultProps = {
  startDate: null,
  endDate: null,
  theme: {},
};

export default withTheme(Datespan);
