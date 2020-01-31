import React from 'react';
import * as Tooltip from '../Tooltip';
import * as m from './momentParsers';

const Component = (timeFormat) => ({ timestamp, format = '' }) => {
  if (m.isValid(timestamp)) {
    return (
      <Tooltip.Middle tip={m.full(timestamp)}>
        <span className="timestamp">
          {timeFormat(timestamp, format)}
        </span>
      </Tooltip.Middle>
    );
  }

  return timeFormat;
};

const DateTime = Component(m.dateTime);
const Date = Component(m.date);
const Full = Component(m.full);
const Ago = Component(m.ago);
const Custom = Component(m.custom);

DateTime.displayName = '@asurgent.ui.moment.DateTime';
Date.displayName = '@asurgent.ui.moment.Date';
Full.displayName = '@asurgent.ui.moment.Full';
Ago.displayName = '@asurgent.ui.moment.Ago';
Custom.displayName = '@asurgent.ui.moment.Custom';


export {
  DateTime,
  Date,
  Full,
  Ago,
  Custom,
};
