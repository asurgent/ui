import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import parser from 'cron-parser';
import moment from 'moment';
import * as C from './Repeat.styled';
import translation from './Repeat.translation';
import * as S from '../../TimeComponents.styled';
import * as Icons from '../Icons';
import { parseMoment } from '../../helpers';

const { t } = translation;

const getRepeatInterval = (duration) => {
  const momentDuration = moment.duration(duration, 'seconds');
  if (momentDuration.years()) {
    return { short: 'yearShort', long: 'yearLong' };
  }
  if (momentDuration.asDays() >= 30) {
    return { short: 'monthShort', long: 'monthLong' };
  }
  if (momentDuration.weeks()) {
    return { short: 'weekShort', long: 'weekLong' };
  }
  if (momentDuration.days()) {
    return { short: 'dayShort', long: 'dayLong' };
  }
  if (momentDuration.hours()) {
    return { short: 'hourShort', long: 'hourLong' };
  }
  if (momentDuration.minutes()) {
    return { short: 'minuteShort', long: 'minuteLong' };
  }
  if (momentDuration.seconds()) {
    return { short: 'secondShort', long: 'secondLong' };
  }
  return { short: 'naIcon', long: 'naText' };
};

const Repeat = ({ currentDate, endDate, cronExpression }) => {
  const validCronInterval = useMemo(() => {
    try {
      return parser.parseExpression(cronExpression, { currentDate, endDate });
    } catch (e) {
      return null;
    }
  }, [cronExpression, currentDate, endDate]);

  const isExpired = useMemo(() => parseMoment(endDate) < moment(), [endDate]);

  const intervalInSeconds = useMemo(() => {
    try {
      const next = parseMoment(validCronInterval.next().toString());
      const prev = parseMoment(validCronInterval.prev().toString());
      return next.diff(prev, 'seconds');
    } catch (e) {
      return null;
    }
  }, [validCronInterval]);


  if (!validCronInterval) {
    return (
      <C.Repeat data-testid="invalid">
        <S.TextSmall withBottomMargin>{t('repeats', 'asurgentui')}</S.TextSmall>
        <Icons.Dots active={false} />
        <S.TextNormal data-testid="short-label">{t('naIcon', 'asurgentui')}</S.TextNormal>
        <S.TextSmall data-testid="long-label">{t('naText', 'asurgentui')}</S.TextSmall>
      </C.Repeat>
    );
  }

  const label = getRepeatInterval(intervalInSeconds);
  return (
    <C.Repeat data-testid="repeat">
      <S.TextSmall withBottomMargin>{t('repeats', 'asurgentui')}</S.TextSmall>
      <Icons.Dots active={!isExpired} />
      {isExpired ? (
        <>
          <S.TextNormal data-testid="short-label">{t('zero', 'asurgentui')}</S.TextNormal>
          <S.TextSmall data-testid="long-label">{t('times', 'asurgentui')}</S.TextSmall>
        </>
      ) : (
        <>
          <S.TextNormal data-testid={label.short}>{t(label.short, 'asurgentui')}</S.TextNormal>
          <S.TextSmall data-testid={label.long}>{t(label.long, 'asurgentui')}</S.TextSmall>
        </>
      )}
    </C.Repeat>
  );
};

Repeat.propTypes = {
  currentDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  endDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  cronExpression: PropTypes.string,
};

Repeat.defaultProps = {
  currentDate: moment(),
  endDate: moment().add(1, 'week'),
  cronExpression: '* * * * *',
};

export default Repeat;
