import React from 'react';
import MomentDuration from './MomentDuration';
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

export {
  DateTime,
  Date,
  Full,
  Ago,
  Custom,
  MomentDuration as Duration,
};
