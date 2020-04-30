import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as Tooltip from '../Tooltip';
import * as m from './momentParsers';
import translation from './Moment.translation';

const { t } = translation;

const propTypes = {
  start: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]).isRequired,
  end: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]).isRequired,
};


const DurationComponent = ({ start, end }) => {
  if (m.isValid(start) && m.isValid(end)) {
    const startDate = moment(start);
    const endDate = moment(end);

    const diff = endDate.diff(startDate);
    const duration = moment.duration(diff);

    const month = duration.get('month');
    const days = duration.get('days');
    const hours = duration.get('hours');
    const minutes = duration.get('minutes');
    const seconds = duration.get('seconds');
    const any = duration.as('seconds');

    return (
      <Tooltip.Middle tip={`${duration.as('seconds')} seconds`}>
        <span className="timestamp">
          {any === 0 && t('none', 'asurgentui')}
          {month > 0 && `${month} ${t('month', 'asurgentui')} `}
          {days > 0 && `${days} ${t('days', 'asurgentui')} `}
          {hours > 0 && `${hours} ${t('hours', 'asurgentui')} `}
          {minutes > 0 && `${minutes} ${t('minutes', 'asurgentui')} `}
          {seconds > 0 && `${seconds} ${t('seconds', 'asurgentui')}`}
        </span>
      </Tooltip.Middle>
    );
  }

  return null;
};

DurationComponent.propTypes = propTypes;
DurationComponent.displayName = '@asurgent.ui.moment.Duration';

export default DurationComponent;
